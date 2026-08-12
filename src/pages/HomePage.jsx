import React from 'react';
import { useCart } from '../context/CartContext';
import { useSite } from '../context/SiteContext';
import BottleCanvas3D from '../components/BottleCanvas3D';
import { Droplets, Sparkles, Wind, Recycle, ArrowRight, ShoppingCart, Check, Shield } from 'lucide-react';

const PROCESS_ICONS = [Droplets, Wind, Shield];

export default function HomePage({ onNavigate }) {
  const { addToCart } = useCart();
  const { config, products, images, t } = useSite();
  const c = config.colors;
  const hero = config.hero;

  return (
    <div className="pt-14 md:pt-20">
      {/* Hero Section */}
      <section className="pt-0 pb-8 md:py-24 px-5 md:px-16 max-w-[1280px] mx-auto min-h-0 md:min-h-[85vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8 order-2 lg:order-1">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit text-xs font-bold uppercase tracking-widest border"
              style={{ backgroundColor: `${c.primary}1a`, borderColor: `${c.primary}4d`, color: c.dark }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: c.primary }} />
              {hero.badge}
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#1a1c1c] tracking-tight leading-[1.05] uppercase">
              {hero.titleLine1} <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(90deg, ${c.dark}, ${c.primary})` }}
              >
                {hero.titleLine2}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#3e4850] leading-relaxed max-w-xl">
              {t(hero.description)}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => onNavigate('product')}
                className="text-white font-bold py-4 px-8 rounded uppercase tracking-wider text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ backgroundColor: c.primary, boxShadow: `0px 4px 20px ${c.primary}40` }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.dark)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = c.primary)}
              >
                <span>{hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="border-2 border-[#bdc8d1] hover:border-[#00658d] font-bold py-4 px-8 rounded uppercase tracking-wider text-sm transition-all duration-300 hover:bg-white flex items-center justify-center"
                style={{ color: c.dark, borderColor: '#bdc8d1' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.dark; e.currentTarget.style.color = c.dark; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#bdc8d1'; e.currentTarget.style.color = c.dark; }}
              >
                {hero.ctaSecondary}
              </button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#e2e2e2]">
              {hero.stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl font-black" style={{ color: c.dark }}>{stat.value}</div>
                  <div className="text-xs text-[#6e7881] font-semibold uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Right: Interactive 3D Realistic Bottle */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center lg:justify-end items-center relative py-0 md:py-4 lg:pl-6">
            <BottleCanvas3D className="w-full max-w-[450px] h-[660px] lg:translate-x-6" />
          </div>
        </div>
      </section>

      {/* The Alchemy of Purity (10-Step Process) */}
      <section className="editorial-spacing bg-[#f3f3f4] px-5 md:px-16 border-y border-[#e2e2e2]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: c.dark }}>
              {config.process.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1c1c] tracking-tight">
              {config.process.title}
            </h2>
            <p className="text-base text-[#3e4850] leading-relaxed">
              {t(config.process.description)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.process.steps.map((step, idx) => {
              const Icon = PROCESS_ICONS[idx % PROCESS_ICONS.length];
              return (
                <div key={idx} className="bg-white border border-[#e2e2e2] p-8 rounded-xl text-center transition-all duration-300 group hover:shadow-xl hover:-translate-y-1"
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primary; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e2e2'; }}
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${c.primary}26`, color: c.primary }}
                  >
                    <Icon className="w-8 h-8" style={{ color: c.primary }} />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: c.dark }}>
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1c1c] mb-3">{step.title}</h3>
                  <p className="text-sm text-[#3e4850] leading-relaxed">
                    {t(step.description)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Showcase Grid: Wholesale Master Cartons */}
      <section className="editorial-spacing px-5 md:px-16 max-w-[1280px] mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: c.dark }}>
            {config.productsSection.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1c1c] tracking-tight">
            {config.productsSection.title}
          </h2>
          <p className="text-base text-[#3e4850] max-w-2xl mx-auto">
            {t(config.productsSection.description)}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3.5 sm:gap-x-6 md:gap-x-8 gap-y-24 sm:gap-y-36 md:gap-y-40 pt-16 sm:pt-28 md:pt-32">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-[#e2e2e2] rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col items-center relative hover:shadow-2xl transition-all duration-300 group overflow-visible pt-0"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primary; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e2e2'; }}
            >
              {product.badge && (
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-wider z-20"
                  style={{ backgroundColor: `${c.success}26`, color: '#006d33', border: `1px solid ${c.success}4d` }}
                >
                  {product.badge}
                </div>
              )}

              {/* 70% Overflowing Bottle Top Section */}
              <div className="-mt-24 sm:-mt-36 md:-mt-44 h-40 sm:h-60 md:h-68 w-full flex items-center justify-center relative z-10 mb-2 sm:mb-3 pointer-events-none">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,101,141,0.28)] group-hover:-translate-y-3 group-hover:scale-105 transition-all duration-300"
                />
              </div>

              {/* Compact Card Details */}
              <div className="text-center w-full space-y-0.5 sm:space-y-1 mb-2.5 sm:mb-3.5">
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                  style={{ color: c.dark, backgroundColor: `${c.primary}1a` }}
                >
                  {product.packSize}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1a1c1c] leading-tight pt-1">{product.title}</h3>
                <p className="text-[11px] sm:text-xs text-[#3e4850] line-clamp-1">{product.subtitle}</p>
                <div className="pt-1">
                  <span className="text-base sm:text-xl font-black" style={{ color: c.dark }}>
                    {config.site.currency}{product.pricePerCase.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-[#6e7881] font-semibold"> / Case</span>
                </div>
                <p className="text-[10px] text-[#6e7881]">({config.site.currency}{product.unitPrice.toFixed(2)}/bottle • Min {product.moq} Cases)</p>
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-1.5 mt-auto">
                <button
                  onClick={() => addToCart(product, product.moq)}
                  className="w-full text-white font-bold py-2 sm:py-2.5 px-2 rounded uppercase tracking-wider text-[10px] sm:text-xs shadow-md transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  style={{ backgroundColor: c.primary }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.dark)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = c.primary)}
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Order {product.moq} Cases</span>
                </button>
                <button
                  onClick={() => onNavigate('product')}
                  className="w-full bg-[#f9f9f9] hover:bg-[#eeeeee] font-semibold py-1 sm:py-1.5 rounded text-[10px] sm:text-xs transition-colors"
                  style={{ color: c.dark }}
                >
                  Bulk Tier Pricing
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sustainability Section: Crystal Clear Conscience */}
      <section className="editorial-spacing bg-[#f3f3f4] px-5 md:px-16 border-t border-[#e2e2e2]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-xl border border-[#e2e2e2]">
            <img
              src={images.sustainability}
              alt="Eco-friendly Sustainability"
              className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-6 lg:pl-8">
            <div className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${c.success}26`, color: '#006d33', border: `1px solid ${c.success}4d` }}
            >
              {config.sustainability.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1c1c] tracking-tight">
              {config.sustainability.title}
            </h2>

            <p className="text-base text-[#3e4850] leading-relaxed">
              {t(config.sustainability.description)}
            </p>

            <div className="space-y-3 pt-2">
              {config.sustainability.points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3 text-[#1a1c1c] font-semibold text-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>{t(point)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('story')}
                className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider transition-colors border-b-2 pb-1"
                style={{ color: c.dark, borderColor: c.dark }}
                onMouseEnter={(e) => { e.currentTarget.style.color = c.primary; e.currentTarget.style.borderColor = c.primary; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = c.dark; e.currentTarget.style.borderColor = c.dark; }}
              >
                <span>{config.sustainability.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
