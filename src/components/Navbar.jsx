import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useSite } from '../context/SiteContext';
import { ShoppingCart, Menu, X, Droplets, ArrowRight } from 'lucide-react';
import { NavbarContactButtons } from './QuickContact';

export default function Navbar({ activePage, setActivePage }) {
  const { cartCount, setIsCartOpen } = useCart();
  const { config, t } = useSite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'product', label: 'Product' },
    { id: 'story', label: 'Our Story' },
    { id: 'contact', label: 'Contact' }
  ];

  const c = config.colors;

  // Lock background body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  const handleNav = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="glass-nav fixed top-0 w-full z-40 border-b border-[#bdc8d1] transition-all duration-300">
        <div className="flex justify-between items-center px-5 md:px-16 py-4 max-w-[1280px] mx-auto h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 text-left group"
          >
            {config.site.logo ? (
              <img
                src={config.site.logo}
                alt={config.site.name}
                className="w-10 h-10 rounded-lg object-contain bg-white border border-[#e2e2e2] shadow-sm group-hover:scale-105 transition-transform"
              />
            ) : (
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform"
                style={{ backgroundColor: c.primary, boxShadow: `0 4px 12px ${c.primary}33` }}
              >
                <Droplets className="w-5 h-5 fill-white" />
              </div>
            )}
            <div>
              <span
                className="text-xl md:text-2xl font-black tracking-tight uppercase"
                style={{ color: c.dark }}
              >
                {config.site.name}
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-widest -mt-1 font-semibold" style={{ color: c.accent }}>
                {config.site.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center font-medium text-sm tracking-wider uppercase">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="relative py-1 transition-colors duration-200"
                style={
                  activePage === link.id
                    ? { color: c.dark }
                    : { color: '#3e4850' }
                }
                onMouseEnter={(e) => {
                  if (activePage !== link.id) e.currentTarget.style.color = c.primary;
                }}
                onMouseLeave={(e) => {
                  if (activePage !== link.id) e.currentTarget.style.color = '#3e4850';
                }}
              >
                {link.label}
                {activePage === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] rounded-full" style={{ backgroundColor: c.dark }} />
                )}
              </button>
            ))}
          </div>

          {/* Trailing Actions */}
          <div className="flex items-center space-x-4">
            {/* WhatsApp + Call (desktop, next to Shop Now) */}
            <NavbarContactButtons />

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Cart"
              className="relative p-2.5 hover:bg-[#eeeeee] rounded-full transition-all duration-200"
              style={{ color: c.dark }}
              onMouseEnter={(e) => (e.currentTarget.style.color = c.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = c.dark)}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse"
                  style={{ backgroundColor: c.primary }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Shop Now CTA Button */}
            <button
              onClick={() => handleNav('product')}
              className="hidden md:flex text-white text-xs uppercase tracking-widest font-bold py-2.5 px-6 rounded transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: c.primary,
                boxShadow: `0 4px 20px ${c.primary}40`
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.dark)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = c.primary)}
            >
              Shop Now
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-[#eeeeee] rounded-lg transition-colors"
              style={{ color: c.dark }}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#bdc8d1] px-6 py-6 space-y-4 shadow-2xl animate-slideDown">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`block w-full text-left py-2.5 text-base font-bold transition-all ${
                  activePage === link.id ? 'pl-3 border-l-4 rounded-r-lg' : 'pl-1'
                }`}
                style={
                  activePage === link.id
                    ? { color: c.dark, borderLeftColor: c.dark, backgroundColor: `${c.primary}0d` }
                    : { color: '#3e4850' }
                }
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 border-t border-[#e2e2e2] space-y-2.5">
              <button
                onClick={() => handleNav('product')}
                className="w-full text-white font-bold py-3.5 rounded text-center uppercase tracking-wider text-xs shadow-md flex items-center justify-center gap-2"
                style={{ backgroundColor: c.primary }}
              >
                <span>Shop All Formats</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Full-Screen Dim & Blur Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 bg-black/60 backdrop-blur-md z-30 transition-opacity duration-300 md:hidden animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu backdrop"
        />
      )}
    </>
  );
}
