import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { DEFAULT_CONFIG } from '../data/siteConfig';
import { PRODUCTS as DEFAULT_PRODUCTS, IMAGES, assetUrl } from '../data/products';

const SiteContext = createContext();

const CONFIG_KEY = 'waterbottle_site_config_v2';
const PRODUCTS_KEY = 'waterbottle_products_v4';

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
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

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
