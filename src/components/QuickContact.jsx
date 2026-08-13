import React from 'react';
import { useSite } from '../context/SiteContext';
import { useCart } from '../context/CartContext';
import { MessageCircle, Phone, ShoppingBag, RefreshCw } from 'lucide-react';

export function OrderStatusButton() {
  const { config } = useSite();
  const { placedOrder, cartItems, setIsCartOpen } = useCart();
  if (!placedOrder) return null;

  const isUpdating = cartItems.length > 0;
  const hasOrderItems = placedOrder.items && placedOrder.items.length > 0;

  return (
    <div className="fixed bottom-5 left-4 z-40">
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex items-center gap-2.5 bg-white text-[#1a1c1c] pl-3 pr-4 py-2.5 rounded-full shadow-2xl border border-[#e2e2e2] hover:scale-105 active:scale-95 transition-transform font-bold text-xs sm:text-sm"
        style={{ boxShadow: `0 8px 24px ${config.colors.dark}33` }}
        title="View your order"
      >
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
          style={{ backgroundColor: isUpdating ? '#f59e0b' : config.colors.primary }}
        >
          {isUpdating ? <RefreshCw className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} /> : <ShoppingBag className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />}
        </span>
        <span className="leading-tight text-left">
          <span className="block text-[10px] uppercase tracking-wider text-[#6e7881] font-semibold">
            {hasOrderItems ? `Order ${placedOrder.id}` : 'Your Order'}
          </span>
          <span className="block" style={{ color: config.colors.dark }}>
            {isUpdating ? 'Update Order' : 'Check Your Order'}
          </span>
        </span>
      </button>
    </div>
  );
}

function useContactLinks() {
  const { config } = useSite();
  const digits = (config.contact.phone || '').replace(/[^\d]/g, '');
  const whatsapp = `https://wa.me/${digits}?text=Hello%20${encodeURIComponent(config.site.name)}!%20I%20would%20like%20to%20place%20a%20bulk%20water%20order.`;
  const call = `tel:+${digits}`;
  return { whatsapp, call };
}

export function FloatingContactButtons() {
  const { whatsapp, call } = useContactLinks();
  const { config } = useSite();
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 md:hidden">
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-13 h-13 rounded-full flex items-center justify-center text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
        style={{ width: 52, height: 52, backgroundColor: '#25D366', boxShadow: '0 6px 20px rgba(37,211,102,0.4)' }}
      >
        <MessageCircle className="w-6 h-6 fill-white" />
      </a>
      <a
        href={call}
        aria-label="Call us"
        className="w-13 h-13 rounded-full flex items-center justify-center text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
        style={{ width: 52, height: 52, backgroundColor: config.colors.primary, boxShadow: `0 6px 20px ${config.colors.primary}66` }}
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}

export function NavbarContactButtons() {
  const { whatsapp, call } = useContactLinks();
  const { config } = useSite();
  return (
    <div className="hidden md:flex items-center gap-1.5">
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
        className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-all hover:scale-105 active:scale-95"
        style={{ backgroundColor: '#25D366', boxShadow: '0 4px 12px rgba(37,211,102,0.35)' }}
      >
        <MessageCircle className="w-4.5 h-4.5 fill-white" style={{ width: 18, height: 18 }} />
      </a>
      <a
        href={call}
        aria-label="Call us"
        title={`Call ${config.contact.phone}`}
        className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-all hover:scale-105 active:scale-95"
        style={{ backgroundColor: config.colors.primary, boxShadow: `0 4px 12px ${config.colors.primary}59` }}
      >
        <Phone className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
      </a>
    </div>
  );
}