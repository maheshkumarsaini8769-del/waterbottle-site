import React, { useState, useRef } from 'react';
import { useSite } from '../context/SiteContext';
import {
  LayoutDashboard, Palette, Droplets, ShoppingBag, Globe, Mail, Image as ImageIcon,
  LogOut, Eye, Upload, Trash2, Plus, Download, UploadCloud, RotateCcw, Save, Lock,
  ChevronDown, ChevronUp, Settings, FileDown, FileUp
} from 'lucide-react';

/* ---------- Small reusable input components ---------- */

function Field({ label, value, onChange, type = 'text', placeholder, textarea, className }) {
  const cls =
    'w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-sm text-[#1a1c1c] focus:outline-none focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/20 ' +
    (className || '');
  const base = { value: value ?? '', onChange: (e) => onChange(e.target.value), placeholder, className: cls };
  if (textarea) return <textarea rows={textarea} {...base} />;
  return <input type={type} {...base} />;
}

function ColorField({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-[#334155] uppercase tracking-wider mb-1 block">{label}</span>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-10 h-10 rounded border border-[#cbd5e1] cursor-pointer bg-white" />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00aeef]" />
      </div>
    </label>
  );
}

function ImageField({ label, value, onChange }) {
  const fileRef = useRef(null);
  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-bold text-[#334155] uppercase tracking-wider block">{label}</span>
      <div className="flex items-start gap-3">
        {value ? (
          <img src={value} alt="preview" className="w-16 h-16 object-contain rounded-lg border border-[#cbd5e1] bg-white" />
        ) : (
          <div className="w-16 h-16 rounded-lg border border-dashed border-[#cbd5e1] flex items-center justify-center text-[#94a3b8]">
            <ImageIcon className="w-6 h-6" />
          </div>
        )}
        <div className="flex-1 space-y-1.5">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL..."
            className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00aeef]"
          />
          <button
            type="button"
            onClick={() => fileRef.current && fileRef.current.click()}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00658d] hover:text-[#00aeef] transition-colors"
          >
            <Upload className="w-3.5 h-3.5" /> Upload from computer
          </button>
          {value && (
            <button type="button" onClick={() => onChange('')} className="block text-xs text-rose-500 hover:underline">
              Remove image
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>
      </div>
    </div>
  );
}

function ListEditor({ items, onChange, fields }) {
  const updateItem = (idx, key, val) => {
    onChange(items.map((item, i) => (i === idx ? { ...item, [key]: val } : item)));
  };
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-[#e2e8f0] rounded-lg p-3 bg-[#f8fafc] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#64748b]">Item {idx + 1}</span>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== idx))}
              className="text-rose-500 hover:text-rose-700 text-xs font-bold inline-flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
          {fields.map((f) => (
            <div key={f.key}>
              {f.type === 'textarea' ? (
                <textarea
                  rows={f.rows || 2}
                  placeholder={f.placeholder || f.label}
                  value={item[f.key] ?? ''}
                  onChange={(e) => updateItem(idx, f.key, e.target.value)}
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00aeef]"
                />
              ) : (
                <input
                  type="text"
                  placeholder={f.placeholder || f.label}
                  value={item[f.key] ?? ''}
                  onChange={(e) => updateItem(idx, f.key, e.target.value)}
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00aeef]"
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, Object.fromEntries(fields.map((f) => [f.key, '']))])}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00658d] hover:text-[#00aeef] transition-colors"
      >
        <Plus className="w-4 h-4" /> Add item
      </button>
    </div>
  );
}

/* ---------- Section components ---------- */

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-[#e2e8f0] bg-[#f8fafc]">
        <h3 className="font-bold text-sm text-[#1a1c1c]">{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

const TAB_LIST = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'branding', label: 'Branding & Logo', icon: Globe },
  { id: 'colors', label: 'Colors & Theme', icon: Palette },
  { id: 'hero', label: 'Home Hero', icon: LayoutDashboard },
  { id: 'process', label: 'Purification Process', icon: Droplets },
  { id: 'products', label: 'Products & Pricing', icon: ShoppingBag },
  { id: 'sustainability', label: 'Sustainability', icon: Droplets },
  { id: 'story', label: 'Our Story Page', icon: Globe },
  { id: 'contact', label: 'Contact & Location', icon: Mail },
  { id: 'footer', label: 'Footer', icon: Settings },
  { id: 'data', label: 'Export / Import / Reset', icon: FileDown }
];

/* ---------- Main Admin Page ---------- */

export default function AdminPage({ onExit }) {
  const { config, products, updateConfig, updateProducts, resetAll } = useSite();
  const [tab, setTab] = useState('dashboard');
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('waterbottle_admin_auth') === '1');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showProducts, setShowProducts] = useState({});
  const [toast, setToast] = useState(null);

  const c = config.colors;

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === config.site.adminPassword) {
      sessionStorage.setItem('waterbottle_admin_auth', '1');
      setAuthed(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Try again.');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('waterbottle_admin_auth');
    setAuthed(false);
    setPassword('');
  };

  const set = (path, value) => updateConfig({ [path]: value });

  const toggleProduct = (id) => setShowProducts(prev => ({ ...prev, [id]: !prev[id] }));

  const updateProduct = (id, patch) => {
    updateProducts(products.map(p => (p.id === id ? { ...p, ...patch } : p)));
  };

  const newProduct = () => {
    const id = 'product-' + Date.now();
    const product = {
      id,
      title: 'New Product',
      subtitle: 'Product subtitle',
      description: 'Product description',
      pricePerCase: 10.0,
      price: 10.0,
      unitPrice: 0.42,
      packSize: '24 Bottles / Case',
      unitsPerCase: 24,
      volume: '500 ml × 24 (12 Liters Total)',
      moq: 5,
      badge: '',
      rating: 4.5,
      reviews: 0,
      image: '/bottle.png',
      tierDiscounts: [
        { min: 5, label: '5 - 19 Cases', price: 10.0, discount: 'Standard B2B' },
        { min: 20, label: '20 - 49 Cases', price: 9.0, discount: '10% OFF' },
        { min: 50, label: '50+ Cases (Pallet)', price: 8.0, discount: '20% OFF' }
      ],
      specs: { packaging: 'Heavy-Duty Corrugated Master Carton', totalVolume: '12 Liters', grossWeight: '12.8 kg / Case', moq: '5 Cases', ph: '7.2 - Neutral', tds: '120 ppm', certifications: 'BIS / FSSAI / ISO 22000' }
    };
    updateProducts([...products, product]);
    setShowProducts(prev => ({ ...prev, [id]: true }));
    notify('Product added');
  };

  const deleteProduct = (id) => {
    updateProducts(products.filter(p => p.id !== id));
    notify('Product deleted');
  };

  const exportJson = () => {
    const data = { config, products };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website-config.json';
    a.click();
    URL.revokeObjectURL(url);
    notify('Config exported as website-config.json');
  };

  const importJson = (text) => {
    try {
      const data = JSON.parse(text);
      if (data.config) updateConfig(data.config);
      if (data.products) updateProducts(data.products);
      notify('Config imported successfully');
    } catch (err) {
      notify('Import failed: invalid JSON');
    }
  };

  /* ---------- Login screen ---------- */
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-6 relative">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 20% 20%, ${c.primary}66, transparent 40%), radial-gradient(circle at 80% 80%, ${c.dark}66, transparent 40%)` }} />
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative z-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: c.primary }}>
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-black text-center text-[#1a1c1c]">Admin Panel</h1>
          <p className="text-sm text-[#64748b] text-center mt-1 mb-6">
            {config.site.name} website management
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/20"
            />
            {loginError && <p className="text-xs text-rose-600 font-semibold">{loginError}</p>}
            <button
              type="submit"
              className="w-full text-white font-bold py-3 rounded-xl uppercase tracking-wider text-xs transition-all hover:scale-[1.01]"
              style={{ backgroundColor: c.primary }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.dark)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = c.primary)}
            >
              Sign In
            </button>
          </form>
          <p className="text-[11px] text-[#94a3b8] text-center mt-4">
            Default password: <code className="bg-[#f1f5f9] px-1.5 py-0.5 rounded font-bold">admin123</code> (change it in Dashboard)
          </p>
          <button onClick={onExit} className="text-xs text-[#94a3b8] hover:text-[#64748b] mt-3 block mx-auto">← Back to website</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Sidebar */}
      <aside className="w-16 lg:w-60 bg-[#0f172a] text-white flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="px-4 py-5 border-b border-white/10 flex items-center gap-2.5">
          {config.site.logo ? (
            <img src={config.site.logo} alt="logo" className="w-9 h-9 rounded-lg object-contain bg-white" />
          ) : (
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: c.primary }}>
              <Droplets className="w-5 h-5 fill-white text-white" />
            </div>
          )}
          <div className="hidden lg:block">
            <div className="font-black text-sm uppercase leading-tight">{config.site.name}</div>
            <div className="text-[10px] text-slate-400">Admin Panel</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          {TAB_LIST.map((tabItem) => {
            const Icon = tabItem.icon;
            return (
              <button
                key={tabItem.id}
                onClick={() => setTab(tabItem.id)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-left transition-colors text-sm font-medium ${
                  tab === tabItem.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                title={tabItem.label}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" style={{ width: 18, height: 18 }} />
                <span className="hidden lg:block">{tabItem.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1.5">
          <button onClick={onExit} className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 text-sm font-medium">
            <Eye className="w-4 h-4 shrink-0" />
            <span className="hidden lg:block">View Website</span>
          </button>
          <button onClick={logout} className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 text-sm font-medium">
            <LogOut className="w-4 h-4 shrink-0" />
            <span className="hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-16 lg:ml-60">
        <header className="bg-white border-b border-[#e2e8f0] px-5 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-lg font-black text-[#1a1c1c]">{TAB_LIST.find(t => t.id === tab)?.label}</h1>
            <p className="text-xs text-[#64748b]">Changes save automatically and appear on the website instantly.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={resetAll} className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#64748b] hover:text-rose-600 border border-[#e2e8f0] rounded-lg px-3 py-2 transition-colors">
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button onClick={onExit} className="inline-flex items-center gap-1.5 text-xs font-bold text-white rounded-lg px-4 py-2 transition-colors" style={{ backgroundColor: c.primary }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.dark)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = c.primary)}
            >
              <Eye className="w-3.5 h-3.5" /> View Site
            </button>
          </div>
        </header>

        {toast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0f172a] text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-2xl">
            <Save className="w-4 h-4 inline mr-2" style={{ color: c.primary }} />
            {toast}
          </div>
        )}

        <main className="p-5 lg:p-8 max-w-5xl space-y-6">
          {/* ================= DASHBOARD ================= */}
          {tab === 'dashboard' && (
            <>
              <Section title="Quick Overview">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Site Name', value: config.site.name },
                    { label: 'Products', value: products.length },
                    { label: 'Theme Color', value: c.primary },
                    { label: 'Contact Email', value: config.contact.email }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4">
                      <div className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">{stat.label}</div>
                      <div className="text-sm font-black text-[#1a1c1c] mt-1 truncate">{stat.value}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#64748b]">
                  Every change you make in this panel is saved to your browser (localStorage) and reflects on the live website instantly.
                  Use the <strong>Export</strong> tab to save a backup of your full website configuration as a JSON file.
                </p>
              </Section>

              <Section title="Security">
                <div>
                  <label className="text-xs font-bold text-[#334155] uppercase tracking-wider mb-1 block">Admin Password</label>
                  <input
                    type="text"
                    value={config.site.adminPassword}
                    onChange={(e) => set('site', { ...config.site, adminPassword: e.target.value })}
                    className="w-full max-w-sm bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00aeef]"
                  />
                  <p className="text-[11px] text-[#94a3b8] mt-1">Used to unlock this admin panel. Keep it secret.</p>
                </div>
              </Section>
            </>
          )}

          {/* ================= BRANDING ================= */}
          {tab === 'branding' && (
            <>
              <Section title="Website Name & Logo">
                <Field label="Site / Brand Name" value={config.site.name} onChange={(v) => set('site', { ...config.site, name: v })} />
                <Field label="Tagline (below logo)" value={config.site.tagline} onChange={(v) => set('site', { ...config.site, tagline: v })} />
                <Field label="Brand Description" textarea={3} value={config.site.description} onChange={(v) => set('site', { ...config.site, description: v })} />
                <Field label="Currency Symbol" value={config.site.currency} onChange={(v) => set('site', { ...config.site, currency: v })} placeholder="$" />
                <ImageField
                  label="Logo (leave empty to use the default water-drop icon)"
                  value={config.site.logo}
                  onChange={(v) => set('site', { ...config.site, logo: v })}
                />
                <p className="text-[11px] text-[#94a3b8]">Tip: upload a PNG with transparency for best results. The logo appears in the navbar and footer.</p>
              </Section>
            </>
          )}

          {/* ================= COLORS ================= */}
          {tab === 'colors' && (
            <Section title="Color Theme">
              <p className="text-xs text-[#64748b]">These colors control buttons, links, headings and accents across the whole website.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ColorField label="Primary (buttons, highlights)" value={c.primary} onChange={(v) => set('colors', { ...config.colors, primary: v })} />
                <ColorField label="Dark (links, headings)" value={c.dark} onChange={(v) => set('colors', { ...config.colors, dark: v })} />
                <ColorField label="Accent (secondary text)" value={c.accent} onChange={(v) => set('colors', { ...config.colors, accent: v })} />
                <ColorField label="Muted / Subtle" value={c.muted} onChange={(v) => set('colors', { ...config.colors, muted: v })} />
                <ColorField label="Success / Green" value={c.success} onChange={(v) => set('colors', { ...config.colors, success: v })} />
              </div>
            </Section>
          )}

          {/* ================= HERO ================= */}
          {tab === 'hero' && (
            <>
              <Section title="Hero Section (Homepage)">
                <Field label="Badge (small pill above title)" value={config.hero.badge} onChange={(v) => set('hero', { ...config.hero, badge: v })} />
                <Field label="Title Line 1" value={config.hero.titleLine1} onChange={(v) => set('hero', { ...config.hero, titleLine1: v })} />
                <Field label="Title Line 2 (gradient text)" value={config.hero.titleLine2} onChange={(v) => set('hero', { ...config.hero, titleLine2: v })} />
                <Field label="Description" textarea={3} value={config.hero.description} onChange={(v) => set('hero', { ...config.hero, description: v })} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Primary Button Text" value={config.hero.ctaPrimary} onChange={(v) => set('hero', { ...config.hero, ctaPrimary: v })} />
                  <Field label="Secondary Button Text" value={config.hero.ctaSecondary} onChange={(v) => set('hero', { ...config.hero, ctaSecondary: v })} />
                </div>
              </Section>
              <Section title="Quick Stats (3 boxes)">
                <ListEditor
                  items={config.hero.stats}
                  onChange={(stats) => set('hero', { ...config.hero, stats })}
                  fields={[
                    { key: 'value', label: 'Big Number / Value' },
                    { key: 'label', label: 'Small Label' }
                  ]}
                />
              </Section>
            </>
          )}

          {/* ================= PROCESS ================= */}
          {tab === 'process' && (
            <>
              <Section title="Purification Process Section">
                <Field label="Eyebrow Text" value={config.process.eyebrow} onChange={(v) => set('process', { ...config.process, eyebrow: v })} />
                <Field label="Section Title" value={config.process.title} onChange={(v) => set('process', { ...config.process, title: v })} />
                <Field label="Description" textarea={2} value={config.process.description} onChange={(v) => set('process', { ...config.process, description: v })} />
              </Section>
              <Section title="Process Steps (3 cards)">
                <ListEditor
                  items={config.process.steps}
                  onChange={(steps) => set('process', { ...config.process, steps })}
                  fields={[
                    { key: 'step', label: 'Step Label (e.g. Step 01 - 04)' },
                    { key: 'title', label: 'Step Title' },
                    { key: 'description', label: 'Step Description', type: 'textarea', rows: 2 }
                  ]}
                />
              </Section>
            </>
          )}

          {/* ================= PRODUCTS ================= */}
          {tab === 'products' && (
            <>
              <Section title="Products Section Header">
                <Field label="Eyebrow Text" value={config.productsSection.eyebrow} onChange={(v) => set('productsSection', { ...config.productsSection, eyebrow: v })} />
                <Field label="Section Title" value={config.productsSection.title} onChange={(v) => set('productsSection', { ...config.productsSection, title: v })} />
                <Field label="Description" textarea={2} value={config.productsSection.description} onChange={(v) => set('productsSection', { ...config.productsSection, description: v })} />
              </Section>

              <Section title={`Products (${products.length})`}>
                <button onClick={newProduct} className="inline-flex items-center gap-1.5 text-xs font-bold text-white rounded-lg px-4 py-2" style={{ backgroundColor: c.success, color: '#fff' }}>
                  <Plus className="w-4 h-4" /> Add New Product
                </button>
                <div className="space-y-3 mt-4">
                  {products.map((p) => {
                    const open = showProducts[p.id];
                    return (
                      <div key={p.id} className="border border-[#e2e8f0] rounded-xl overflow-hidden bg-white">
                        <div className="flex items-center gap-3 px-4 py-3 bg-[#f8fafc] hover:bg-[#f1f5f9] transition-colors">
                          <img src={p.image} alt={p.title} className="w-10 h-14 object-contain bg-white rounded border border-[#e2e8f0]" />
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm text-[#1a1c1c] truncate">{p.title}</div>
                            <div className="text-[11px] text-[#64748b]">{config.site.currency}{p.pricePerCase.toFixed(2)} / case • Min {p.moq} cases</div>
                          </div>
                          <button onClick={() => toggleProduct(p.id)} className="text-[#64748b] hover:text-[#1a1c1c]" title={open ? 'Collapse' : 'Expand'}>
                            {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                          <button onClick={() => deleteProduct(p.id)} className="text-rose-500 hover:text-rose-700" title="Delete product">
                            <Trash2 className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                          </button>
                        </div>
                        {open && (
                          <div className="p-4 space-y-4 border-t border-[#e2e8f0]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <Field label="Title" value={p.title} onChange={(v) => updateProduct(p.id, { title: v })} />
                              <Field label="Subtitle" value={p.subtitle} onChange={(v) => updateProduct(p.id, { subtitle: v })} />
                            </div>
                            <Field label="Description" textarea={2} value={p.description} onChange={(v) => updateProduct(p.id, { description: v })} />
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <Field label="Price / Case" type="number" value={p.pricePerCase} onChange={(v) => updateProduct(p.id, { pricePerCase: parseFloat(v) || 0, price: parseFloat(v) || 0 })} />
                              <Field label="Unit Price" type="number" value={p.unitPrice} onChange={(v) => updateProduct(p.id, { unitPrice: parseFloat(v) || 0 })} />
                              <Field label="Units / Case" type="number" value={p.unitsPerCase} onChange={(v) => updateProduct(p.id, { unitsPerCase: parseInt(v) || 0 })} />
                              <Field label="Min Order (MOQ)" type="number" value={p.moq} onChange={(v) => updateProduct(p.id, { moq: parseInt(v) || 0 })} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <Field label="Pack Size (e.g. '24 Bottles / Case')" value={p.packSize} onChange={(v) => updateProduct(p.id, { packSize: v })} />
                              <Field label="Volume (e.g. '500 ml × 24')" value={p.volume} onChange={(v) => updateProduct(p.id, { volume: v })} />
                              <Field label="Badge (e.g. 'Popular B2B')" value={p.badge} onChange={(v) => updateProduct(p.id, { badge: v })} />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <Field label="Rating" type="number" value={p.rating} onChange={(v) => updateProduct(p.id, { rating: parseFloat(v) || 0 })} />
                              <Field label="Reviews" type="number" value={p.reviews} onChange={(v) => updateProduct(p.id, { reviews: parseInt(v) || 0 })} />
                            </div>
                            <ImageField label="Product Image" value={p.image} onChange={(v) => updateProduct(p.id, { image: v })} />
                            <div>
                              <label className="text-xs font-bold text-[#334155] uppercase tracking-wider mb-1 block">Tier Discounts</label>
                              <ListEditor
                                items={p.tierDiscounts}
                                onChange={(tiers) => updateProduct(p.id, { tierDiscounts: tiers })}
                                fields={[
                                  { key: 'label', label: 'Tier Label' },
                                  { key: 'price', label: 'Price per Case' },
                                  { key: 'discount', label: 'Discount Label' }
                                ]}
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-[#334155] uppercase tracking-wider mb-1 block">Specifications</label>
                              <div className="border border-[#e2e8f0] rounded-lg p-3 bg-[#f8fafc] space-y-2">
                                {Object.entries(p.specs || {}).map(([key, val]) => (
                                  <div key={key} className="flex gap-2 items-center">
                                    <input
                                      type="text"
                                      value={key}
                                      onChange={(e) => {
                                        const specs = { ...p.specs };
                                        const newKey = e.target.value;
                                        if (newKey !== key) {
                                          specs[newKey] = specs[key];
                                          delete specs[key];
                                          updateProduct(p.id, { specs });
                                        }
                                      }}
                                      className="w-1/3 bg-white border border-[#cbd5e1] rounded-lg px-2 py-1.5 text-xs uppercase focus:outline-none focus:border-[#00aeef]"
                                    />
                                    <input
                                      type="text"
                                      value={val}
                                      onChange={(e) => updateProduct(p.id, { specs: { ...p.specs, [key]: e.target.value } })}
                                      className="flex-1 bg-white border border-[#cbd5e1] rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#00aeef]"
                                    />
                                    <button
                                      onClick={() => {
                                        const specs = { ...p.specs };
                                        delete specs[key];
                                        updateProduct(p.id, { specs });
                                      }}
                                      className="text-rose-500 hover:text-rose-700"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  onClick={() => updateProduct(p.id, { specs: { ...p.specs, newSpec: 'Value' } })}
                                  className="text-xs font-bold text-[#00658d] hover:text-[#00aeef] inline-flex items-center gap-1"
                                >
                                  <Plus className="w-3.5 h-3.5" /> Add spec
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Section>
            </>
          )}

          {/* ================= SUSTAINABILITY ================= */}
          {tab === 'sustainability' && (
            <>
              <Section title="Sustainability Section (Homepage)">
                <Field label="Badge" value={config.sustainability.badge} onChange={(v) => set('sustainability', { ...config.sustainability, badge: v })} />
                <Field label="Title" value={config.sustainability.title} onChange={(v) => set('sustainability', { ...config.sustainability, title: v })} />
                <Field label="Description ({brand} = site name)" textarea={3} value={config.sustainability.description} onChange={(v) => set('sustainability', { ...config.sustainability, description: v })} />
                <ImageField label="Section Image" value={config.sustainability.image} onChange={(v) => set('sustainability', { ...config.sustainability, image: v })} />
              </Section>
              <Section title="Checklist Points">
                <ListEditor
                  items={config.sustainability.points.map(p => ({ text: p }))}
                  onChange={(points) => set('sustainability', { ...config.sustainability, points: points.map(p => p.text) })}
                  fields={[{ key: 'text', label: 'Point text' }]}
                />
              </Section>
            </>
          )}

          {/* ================= STORY ================= */}
          {tab === 'story' && (
            <>
              <Section title="Story Page Hero">
                <Field label="Eyebrow" value={config.story.eyebrow} onChange={(v) => set('story', { ...config.story, eyebrow: v })} />
                <Field label="Title" value={config.story.title} onChange={(v) => set('story', { ...config.story, title: v })} />
                <Field label="Hero Text" textarea={2} value={config.story.heroText} onChange={(v) => set('story', { ...config.story, heroText: v })} />
                <ImageField label="Hero Background Image" value={config.story.heroImage} onChange={(v) => set('story', { ...config.story, heroImage: v })} />
              </Section>
              <Section title="Mission Section">
                <Field label="Eyebrow" value={config.story.visionEyebrow} onChange={(v) => set('story', { ...config.story, visionEyebrow: v })} />
                <Field label="Title" value={config.story.visionTitle} onChange={(v) => set('story', { ...config.story, visionTitle: v })} />
                <Field label="Paragraph 1" textarea={3} value={config.story.visionText1} onChange={(v) => set('story', { ...config.story, visionText1: v })} />
                <Field label="Paragraph 2" textarea={3} value={config.story.visionText2} onChange={(v) => set('story', { ...config.story, visionText2: v })} />
                <ImageField label="Mission Image" value={config.story.visionImage} onChange={(v) => set('story', { ...config.story, visionImage: v })} />
              </Section>
              <Section title="Source to Sip Section">
                <Field label="Eyebrow" value={config.story.sourceEyebrow} onChange={(v) => set('story', { ...config.story, sourceEyebrow: v })} />
                <Field label="Title" value={config.story.sourceTitle} onChange={(v) => set('story', { ...config.story, sourceTitle: v })} />
                <Field label="Description" textarea={2} value={config.story.sourceDescription} onChange={(v) => set('story', { ...config.story, sourceDescription: v })} />
              </Section>
              <Section title="Source to Sip Cards (3)">
                <ListEditor
                  items={config.story.sourceSteps}
                  onChange={(steps) => set('story', { ...config.story, sourceSteps: steps })}
                  fields={[
                    { key: 'title', label: 'Card Title' },
                    { key: 'description', label: 'Card Description', type: 'textarea', rows: 2 },
                    { key: 'footer', label: 'Footer Label' }
                  ]}
                />
              </Section>
            </>
          )}

          {/* ================= CONTACT ================= */}
          {tab === 'contact' && (
            <>
              <Section title="Contact Page Header">
                <Field label="Eyebrow" value={config.contact.eyebrow} onChange={(v) => set('contact', { ...config.contact, eyebrow: v })} />
                <Field label="Title" value={config.contact.title} onChange={(v) => set('contact', { ...config.contact, title: v })} />
                <Field label="Description" textarea={2} value={config.contact.description} onChange={(v) => set('contact', { ...config.contact, description: v })} />
              </Section>
              <Section title="Contact Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Phone Number" value={config.contact.phone} onChange={(v) => set('contact', { ...config.contact, phone: v })} />
                  <Field label="Email Address" value={config.contact.email} onChange={(v) => set('contact', { ...config.contact, email: v })} />
                </div>
                <Field label="Address Line 1 (building)" value={config.contact.addressLine1} onChange={(v) => set('contact', { ...config.contact, addressLine1: v })} />
                <Field label="Address Line 2 (street / city)" textarea={2} value={config.contact.addressLine2} onChange={(v) => set('contact', { ...config.contact, addressLine2: v })} />
                <Field label="Address Card Label" value={config.contact.addressLabel} onChange={(v) => set('contact', { ...config.contact, addressLabel: v })} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Google Maps URL" value={config.contact.mapsUrl} onChange={(v) => set('contact', { ...config.contact, mapsUrl: v })} />
                  <Field label="Maps Button Label" value={config.contact.mapsLabel} onChange={(v) => set('contact', { ...config.contact, mapsLabel: v })} />
                </div>
                <ImageField label="Map Image" value={config.contact.mapImage} onChange={(v) => set('contact', { ...config.contact, mapImage: v })} />
              </Section>
              <Section title="Operating Hours">
                <ListEditor
                  items={config.contact.hours}
                  onChange={(hours) => set('contact', { ...config.contact, hours })}
                  fields={[
                    { key: 'day', label: 'Day(s)' },
                    { key: 'time', label: 'Hours (or "Closed")' }
                  ]}
                />
              </Section>
            </>
          )}

          {/* ================= FOOTER ================= */}
          {tab === 'footer' && (
            <>
              <Section title="Footer Content">
                <Field label="About Text" textarea={3} value={config.footer.about} onChange={(v) => set('footer', { ...config.footer, about: v })} />
                <Field label="Copyright Text ({year} {brand} allowed)" value={config.footer.copyright} onChange={(v) => set('footer', { ...config.footer, copyright: v })} />
                <Field label="Newsletter Title" value={config.footer.newsletterTitle} onChange={(v) => set('footer', { ...config.footer, newsletterTitle: v })} />
                <Field label="Newsletter Text" textarea={2} value={config.footer.newsletterText} onChange={(v) => set('footer', { ...config.footer, newsletterText: v })} />
                <Field label="Newsletter Button Text" value={config.footer.newsletterButton} onChange={(v) => set('footer', { ...config.footer, newsletterButton: v })} />
              </Section>
              <Section title="Badges Bar (4 boxes)">
                <ListEditor
                  items={config.footer.badges}
                  onChange={(badges) => set('footer', { ...config.footer, badges })}
                  fields={[
                    { key: 'title', label: 'Badge Title' },
                    { key: 'subtitle', label: 'Badge Subtitle' }
                  ]}
                />
              </Section>
            </>
          )}

          {/* ================= DATA ================= */}
          {tab === 'data' && (
            <>
              <Section title="Export Configuration">
                <p className="text-xs text-[#64748b]">
                  Downloads a JSON backup of your whole website (branding, colors, pages, products, contact info). Keep it safe — use it to restore or move the site.
                </p>
                <button onClick={exportJson} className="inline-flex items-center gap-2 text-xs font-bold text-white rounded-lg px-4 py-2.5" style={{ backgroundColor: c.primary }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.dark)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = c.primary)}
                >
                  <Download className="w-4 h-4" /> Download website-config.json
                </button>
              </Section>
              <Section title="Import Configuration">
                <p className="text-xs text-[#64748b]">Paste a previously exported JSON below and click Import. This replaces current settings.</p>
                <ImportBox onImport={importJson} />
              </Section>
              <Section title="Danger Zone">
                <p className="text-xs text-[#64748b]">Restore the original default website. All your custom changes will be lost.</p>
                <button onClick={() => { if (confirm('Reset the entire website to defaults? This cannot be undone.')) { resetAll(); notify('Website reset to defaults'); } }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 border border-rose-200 bg-rose-50 rounded-lg px-4 py-2.5 hover:bg-rose-100 transition-colors">
                  <RotateCcw className="w-4 h-4" /> Reset Website to Defaults
                </button>
              </Section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function ImportBox({ onImport }) {
  const fileRef = useRef(null);
  const [text, setText] = useState('');

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setText(reader.result);
    reader.readAsText(file);
  };

  return (
    <div className="space-y-3">
      <textarea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='{"config": {...}, "products": [...]}'
        className="w-full bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#00aeef]"
      />
      <div className="flex gap-2">
        <button onClick={() => fileRef.current && fileRef.current.click()} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00658d] border border-[#cbd5e1] rounded-lg px-4 py-2 hover:bg-[#f8fafc] transition-colors">
          <UploadCloud className="w-4 h-4" /> Choose JSON file
        </button>
        <button onClick={() => onImport(text)} className="inline-flex items-center gap-1.5 text-xs font-bold text-white rounded-lg px-4 py-2" style={{ backgroundColor: '#0f172a' }}>
          <FileUp className="w-4 h-4" /> Import
        </button>
        <input ref={fileRef} type="file" accept=".json,application/json" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
}