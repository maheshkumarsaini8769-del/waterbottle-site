import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { DEFAULT_CONFIG } from '../data/siteConfig';
import { PRODUCTS as DEFAULT_PRODUCTS, IMAGES, assetUrl } from '../data/products';

const SiteContext = createContext();

const CONFIG_KEY = 'waterbottle_site_config_v2';
const PRODUCTS_KEY = 'waterbottle_products_v4';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001/api';

async function apiPut(path, body) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

export function deepMerge(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? base : override;
  }
  const result = { ...base };
  Object.keys(override).forEach((key) => {
    if (isPlainObject(override[key]) && isPlainObject(base[key])) {
      result[key] = deepMerge(base[key], override[key]);
    } else {
      result[key] = override[key];
    }
  });
  return result;
}

function loadConfig() {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) return deepMerge(DEFAULT_CONFIG, JSON.parse(saved));
  } catch (e) {
    console.error('Failed to load site config', e);
  }
  return DEFAULT_CONFIG;
}

function loadProducts() {
  try {
    const saved = localStorage.getItem(PRODUCTS_KEY);
    if (saved) {
      const list = JSON.parse(saved);
      return list.map((p) => ({ ...p, image: assetUrl(p.image) }));
    }
  } catch (e) {
    console.error('Failed to load products', e);
  }
  return DEFAULT_PRODUCTS;
}

export function SiteProvider({ children }) {
  const [config, setConfig] = useState(loadConfig);
  const [products, setProducts] = useState(loadProducts);

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    } catch (e) {
      console.error(e);
    }
    apiPut('/config', config);
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
    apiPut('/products', products);
  }, [products]);

  // Load authoritative data from MongoDB backend (fallback: localStorage / defaults)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/site`);
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        if (data.config && typeof data.config === 'object') {
          setConfig(deepMerge(DEFAULT_CONFIG, data.config));
        }
        if (Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products.map((p) => ({ ...p, image: assetUrl(p.image) })));
        }
      } catch (e) {
        // backend offline → keep using localStorage / defaults
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Live sync: changes made in the admin tab instantly appear in the website tab (same origin)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === CONFIG_KEY && e.newValue) {
        try {
          setConfig(deepMerge(DEFAULT_CONFIG, JSON.parse(e.newValue)));
        } catch (err) {
          console.error(err);
        }
      }
      if (e.key === PRODUCTS_KEY && e.newValue) {
        try {
          const list = JSON.parse(e.newValue);
          setProducts(list.map((p) => ({ ...p, image: assetUrl(p.image) })));
        } catch (err) {
          console.error(err);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const updateConfig = useCallback((patch) => {
    setConfig((prev) => deepMerge(prev, patch));
  }, []);

  const setConfigRaw = useCallback((next) => {
    setConfig(next);
  }, []);

  const resetConfig = useCallback(() => {
    localStorage.removeItem(CONFIG_KEY);
    setConfig(DEFAULT_CONFIG);
  }, []);

  const updateProducts = useCallback((next) => {
    setProducts(next);
  }, []);

  const resetProducts = useCallback(() => {
    localStorage.removeItem(PRODUCTS_KEY);
    setProducts(DEFAULT_PRODUCTS);
  }, []);

  const resetAll = useCallback(() => {
    resetConfig();
    resetProducts();
  }, [resetConfig, resetProducts]);

  const images = {
    heroBottle: IMAGES.heroBottle,
    detailBottle: IMAGES.detailBottle,
    rootScreen: IMAGES.rootScreen,
    sustainability: config.sustainability.image,
    officeBuilding: config.story.heroImage,
    waterDrops: config.story.visionImage,
    bkcMap: config.contact.mapImage
  };

  const vars = {
    brand: config.site.name,
    year: new Date().getFullYear()
  };

  const t = useCallback((text) => {
    if (!text) return text;
    return text.replace(/\{(\w+)\}/g, (match, key) =>
      vars[key] !== undefined ? vars[key] : match
    );
  }, [config.site.name]);

  return (
    <SiteContext.Provider
      value={{
        config,
        products,
        images,
        t,
        updateConfig,
        setConfigRaw,
        resetConfig,
        updateProducts,
        resetProducts,
        resetAll
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}
