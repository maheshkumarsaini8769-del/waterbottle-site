import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useSite } from '../context/SiteContext';
import BottleCanvas3D from '../components/BottleCanvas3D';
import {
  Rotate3d,
  Image as ImageIcon,
  CheckCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  Plus,
  Minus,
  ShoppingBag,
  Award,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

export default function ProductDetailPage({ onNavigate }) {
  const { addToCart } = useCart();
  const { products, config } = useSite();
  const c = config.colors;
  const currency = config.site.currency;
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [viewMode, setViewMode] = useState('image'); // 'image' or '3d'
  const [caseQuantity, setCaseQuantity] = useState(5); // Default MOQ: 5 Cases

  useEffect(() => {
    if (products.length > 0) {
      setSelectedProduct(prev => {
        const stillExists = products.find(p => p.id === prev.id);
        return stillExists || products[0];
      });
    }
  }, [products]);

  useEffect(() => {
    setCaseQuantity(selectedProduct ? selectedProduct.moq || 5 : 5);
  }, [selectedProduct]);

  if (!selectedProduct) return <div className="pt-40 text-center text-[#3e4850]">No products available.</div>;

  // Bulk discount calculation
  const baseCasePrice = selectedProduct.pricePerCase;
  let activeDiscountPercent = 0;
  let effectiveCasePrice = baseCasePrice;

  if (caseQuantity >= 50) {
    activeDiscountPercent = 20;
    effectiveCasePrice = baseCasePrice * 0.8;
  } else if (caseQuantity >= 20) {
    activeDiscountPercent = 10;
    effectiveCasePrice = baseCasePrice * 0.9;
  }

  const totalBottles = caseQuantity * selectedProduct.unitsPerCase;
  const totalPrice = effectiveCasePrice * caseQuantity;
  const originalPrice = baseCasePrice * caseQuantity;
  const totalSavings = originalPrice - totalPrice;

  const handleAddBulkOrder = () => {
    addToCart(selectedProduct, caseQuantity);
  };

  return (
    <div className="pt-20">
      {/* Product Hero Section */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Product Showcase (3D / Image Toggle) */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <div className="relative bg-white border border-[#e2e2e2] rounded-2xl p-6 md:p-8 flex justify-center items-center h-[520px] md:h-[720px] shadow-sm overflow-hidden group">
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ backgroundColor: `${c.primary}0d` }} />

              {/* View Switcher Toggle */}
              <div className="absolute top-4 right-4 z-20 flex bg-white/90 backdrop-blur-md rounded-lg p-1 border border-[#bdc8d1] shadow-sm">
                <button
                  onClick={() => setViewMode('image')}
                  className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all ${
                    viewMode === 'image' ? 'text-white shadow' : 'text-[#3e4850]'
                  }`}
                  style={viewMode === 'image' ? { backgroundColor: c.dark } : { color: '#3e4850' }}
                  onMouseEnter={(e) => { if (viewMode !== 'image') e.currentTarget.style.color = c.dark; }}
                  onMouseLeave={(e) => { if (viewMode !== 'image') e.currentTarget.style.color = '#3e4850'; }}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Studio Photo</span>
                </button>
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all ${
                    viewMode === '3d' ? 'text-white shadow' : 'text-[#3e4850]'
                  }`}
                  style={viewMode === '3d' ? { backgroundColor: c.dark } : { color: '#3e4850' }}
                  onMouseEnter={(e) => { if (viewMode !== '3d') e.currentTarget.style.color = c.dark; }}
                  onMouseLeave={(e) => { if (viewMode !== '3d') e.currentTarget.style.color = '#3e4850'; }}
                >
                  <Rotate3d className="w-3.5 h-3.5" />
                  <span>3D Interactive</span>
                </button>
              </div>

              {/* Content based on View Mode */}
              {viewMode === '3d' ? (
                <div className="w-full h-full relative flex items-center justify-center">
                  <BottleCanvas3D className="w-full h-full" />
                </div>
              ) : (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="max-h-[95%] max-w-[85%] object-contain drop-shadow-[0_20px_50px_rgba(0,174,239,0.25)] animate-float transition-all duration-300 scale-105 md:scale-115"
                />
              )}
            </div>

            {/* Case Pack Switcher */}
            <div className="grid grid-cols-3 gap-3">
              {products.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => {
                    setSelectedProduct(prod);
                  }}
                  className="p-3 rounded-xl border text-center transition-all bg-white"
                  style={
                    selectedProduct.id === prod.id
                      ? { borderColor: c.primary, backgroundColor: `${c.primary}1a`, boxShadow: 'inset 0 0 0 1px ' + c.primary }
                      : { borderColor: '#e2e2e2' }
                  }
                  onMouseEnter={(e) => { if (selectedProduct.id !== prod.id) e.currentTarget.style.borderColor = '#bdc8d1'; }}
                  onMouseLeave={(e) => { if (selectedProduct.id !== prod.id) e.currentTarget.style.borderColor = '#e2e2e2'; }}
                >
                  <div className="text-xs font-bold uppercase" style={{ color: c.dark }}>{prod.title}</div>
                  <div className="text-[11px] text-[#3e4850] font-medium">{currency}{prod.pricePerCase.toFixed(2)}/case</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info & Wholesale Buy Box */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border"
                style={{ backgroundColor: `${c.primary}1a`, color: c.dark, borderColor: `${c.primary}4d` }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: c.primary }} />
                Direct Wholesale Case • Min {selectedProduct.moq} Cases
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-[#1a1c1c] tracking-tight mb-2">
                {selectedProduct.title}
              </h1>

              <p className="text-sm text-[#3e4850] leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Volume Pricing Tiers */}
            <div className="bg-white border border-[#e2e2e2] rounded-xl p-4 space-y-3">
              <div className="text-xs font-bold text-[#1a1c1c] uppercase tracking-wider flex items-center justify-between">
                <span>Tiered Wholesale Discounts</span>
                <span className="text-[11px] font-semibold" style={{ color: c.dark }}>Bulk Rates</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {selectedProduct.tierDiscounts.map((tier, idx) => {
                  const isActive =
                    (idx === 0 && caseQuantity < 20) ||
                    (idx === 1 && caseQuantity >= 20 && caseQuantity < 50) ||
                    (idx === 2 && caseQuantity >= 50);
                  return (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg border transition-all"
                      style={
                        isActive
                          ? { borderColor: c.primary, backgroundColor: `${c.primary}1a`, fontWeight: 700, color: c.dark }
                          : { borderColor: '#eeeeee', backgroundColor: '#f9f9f9', color: '#3e4850' }
                      }
                    >
                      <div className="text-[11px] font-semibold">{tier.label}</div>
                      <div className="text-sm font-black pt-0.5">{currency}{tier.price.toFixed(2)}/cs</div>
                      <div className="text-[10px] text-emerald-600 font-bold">{tier.discount}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price & Quantity Box */}
            <div className="bg-[#f3f3f4] p-5 sm:p-6 rounded-2xl border border-[#e2e2e2] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase text-[#6e7881] font-bold">Effective Rate</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black" style={{ color: c.dark }}>
                      {currency}{effectiveCasePrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#6e7881] font-semibold">/ Case ({selectedProduct.unitsPerCase} units)</span>
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold pt-0.5">
                    {currency}{(effectiveCasePrice / selectedProduct.unitsPerCase).toFixed(2)} per individual bottle
                  </div>
                </div>

                {/* Case Quantity Modifier */}
                <div className="flex flex-col items-end">
                  <span className="text-xs font-semibold text-[#6e7881] mb-1">Number of Cases:</span>
                  <div className="flex items-center border border-[#bdc8d1] rounded-xl bg-white p-1 shadow-sm">
                    <button
                      onClick={() => setCaseQuantity(Math.max(selectedProduct.moq || 5, caseQuantity - 5))}
                      className="p-2 text-[#3e4850] rounded-lg transition-colors"
                      title="Decrease 5 Cases"
                      onMouseEnter={(e) => (e.currentTarget.style.color = c.dark)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#3e4850')}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-bold text-base text-[#1a1c1c]">{caseQuantity}</span>
                    <button
                      onClick={() => setCaseQuantity(caseQuantity + 5)}
                      className="p-2 text-[#3e4850] rounded-lg transition-colors"
                      title="Increase 5 Cases"
                      onMouseEnter={(e) => (e.currentTarget.style.color = c.dark)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#3e4850')}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[11px] text-[#6e7881] mt-1 font-medium">Total: {totalBottles} Bottles</span>
                </div>
              </div>

              {/* Order Breakdown Banner */}
              <div className="bg-white p-3.5 rounded-xl border border-[#e2e2e2] flex justify-between items-center text-xs">
                <div>
                  <span className="text-[#6e7881]">Order Total: </span>
                  <span className="font-bold text-[#1a1c1c] text-sm">{currency}{totalPrice.toFixed(2)}</span>
                  {totalSavings > 0 && (
                    <span className="ml-2 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      Saved {currency}{totalSavings.toFixed(2)} ({activeDiscountPercent}% OFF)
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-semibold" style={{ color: c.dark }}>Min MOQ: {selectedProduct.moq} Cases</span>
              </div>

              {/* Order Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddBulkOrder}
                  className="flex-1 text-white font-bold py-3.5 px-6 rounded uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ backgroundColor: c.primary, boxShadow: `0px 4px 20px ${c.primary}40` }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.dark)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = c.primary)}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {caseQuantity} Cases ({currency}{totalPrice.toFixed(2)}) to Order</span>
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-white border-2 font-bold py-3.5 px-5 rounded uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-1.5"
                  style={{ borderColor: c.dark, color: c.dark }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = c.dark; e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = c.dark; }}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Custom Quote</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-[#3e4850] pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Shrink-Wrapped Master Carton
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4" style={{ color: c.primary }} /> Pan-India Freight Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" style={{ color: c.dark }} /> GST B2B Invoicing
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="editorial-spacing bg-[#f3f3f4] px-5 md:px-16 border-t border-[#e2e2e2]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: c.dark }}>
              Laboratory & Packaging Specs
            </span>
            <h2 className="text-3xl font-extrabold text-[#1a1c1c]">
              Wholesale Master Carton Specifications
            </h2>
          </div>

          <div className="bg-white border border-[#e2e2e2] rounded-2xl overflow-hidden shadow-sm max-w-4xl mx-auto">
            <div className="divide-y divide-[#e2e2e2]">
              {Object.entries(selectedProduct.specs || {}).map(([key, value]) => (
                <div key={key} className="grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 hover:bg-[#f9f9f9] transition-colors">
                  <div className="font-bold text-xs uppercase tracking-wider mb-1 md:mb-0" style={{ color: c.dark }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="md:col-span-2 text-sm text-[#1a1c1c] font-medium">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
