import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useSite } from '../context/SiteContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, FileSpreadsheet, CheckCircle2, Phone, MessageCircle } from 'lucide-react';

export default function CartDrawer({ onNavigate }) {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    checkout,
    cartTotal,
    cartCount,
    totalBottles,
    bulkSavings,
    calculateItemPrice,
    placedOrder,
    clearPlacedOrder
  } = useCart();
  const { config } = useSite();

  // Lock background body scroll & blur when cart is open
  useEffect(() => {
    if (isCartOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      // Close on Escape key press
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsCartOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background Dim & Blur Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
        aria-label="Close cart backdrop"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#f9f9f9] shadow-2xl flex flex-col border-l border-[#bdc8d1] z-50 transform transition-transform duration-300 ease-out animate-slideLeft">
          {/* Cart Header */}
          <div className="p-5 sm:p-6 border-b border-[#e2e2e2] bg-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00aeef]/10 flex items-center justify-center text-[#00658d]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1a1c1c]">Wholesale Order</h2>
                <p className="text-xs text-[#3e4850]">
                  {cartCount} Cases • {totalBottles} Individual Bottles
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#3e4850] hover:text-[#00658d] hover:bg-[#eeeeee] rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wholesale Policy Banner */}
          <div className="bg-[#00aeef]/10 px-5 sm:px-6 py-2.5 border-b border-[#00aeef]/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#00658d] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#00aeef]" />
              <span>B2B Direct Pricing • Min 5 Cases / Item</span>
            </div>
            <span className="text-[11px] bg-white text-[#00658d] px-2 py-0.5 rounded font-semibold border border-[#00aeef]/30">
              GST Ready
            </span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-4">
            {placedOrder ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-5">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-2xl font-black text-[#1a1c1c]">Order Placed!</h3>
                  <p className="text-xs text-[#6e7881] font-semibold uppercase tracking-wider">
                    Order ID: {placedOrder.id}
                  </p>
                </div>

                <div className="w-full bg-white border border-[#e2e2e2] rounded-xl p-4 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#3e4850]">Master Cartons</span>
                    <span className="font-bold text-[#1a1c1c]">{placedOrder.count} Cases</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3e4850]">Total Bottles</span>
                    <span className="font-bold text-[#1a1c1c]">{placedOrder.bottles} Units</span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-[#e2e2e2]">
                    <span className="text-[#3e4850]">Order Amount</span>
                    <span className="font-black text-[#00658d] text-lg">{config.site.currency}{placedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-[#00aeef]/10 border border-[#00aeef]/30 rounded-xl p-4 text-sm text-[#1a1c1c] font-medium">
                  🚚 Your order has been received. Our {config.site.name} team will call you within a few minutes to confirm delivery.
                  <span className="block mt-1.5 font-bold" style={{ color: config.colors.dark }}>Need it faster? Call us right now!</span>
                </div>

                <div className="w-full space-y-2.5">
                  <a
                    href={`tel:+${(config.contact.phone || '').replace(/[^\d]/g, '')}`}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3.5 rounded-xl uppercase tracking-wider text-sm shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <Phone className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${(config.contact.phone || '').replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hello, my order ' + placedOrder.id + ' has been placed. Please confirm.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#1fb959] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-sm shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4.5 h-4.5 fill-white" style={{ width: 18, height: 18 }} />
                    WhatsApp Us
                  </a>
                  <button
                    onClick={() => { clearPlacedOrder(); onNavigate('product'); }}
                    className="w-full bg-[#f9f9f9] hover:bg-[#eeeeee] text-[#00658d] font-bold py-3 rounded-xl uppercase tracking-wider text-xs transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#eeeeee] flex items-center justify-center text-[#6e7881]">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a1c1c]">Your bulk cart is empty</h3>
                <p className="text-sm text-[#3e4850] max-w-xs">
                  Add master cartons (Min 5 Cases) to unlock wholesale direct manufacturer pricing.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('product');
                  }}
                  className="mt-2 inline-flex items-center gap-2 bg-[#00aeef] text-white px-6 py-3 rounded font-bold uppercase tracking-wider text-xs hover:bg-[#00658d] transition-colors"
                >
                  Explore Master Cartons <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const effectivePrice = calculateItemPrice ? calculateItemPrice(item, item.quantity) : item.price;
                const hasDiscount = effectivePrice < item.pricePerCase;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-[#e2e2e2] rounded-xl p-4 flex gap-4 items-center shadow-sm relative"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-24 object-contain bg-[#f9f9f9] rounded-lg p-1 border border-[#eeeeee] drop-shadow-sm"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-[#1a1c1c] text-sm sm:text-base leading-tight">{item.title}</h4>
                          <p className="text-[11px] text-[#00658d] font-semibold pt-0.5">
                            {item.quantity * item.unitsPerCase} Bottles ({item.quantity} Cases)
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#6e7881] hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center border border-[#bdc8d1] rounded-lg bg-[#f9f9f9]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2.5 py-1 text-[#3e4850] hover:text-[#00658d] transition-colors font-bold text-xs"
                            title="Decrease 1 Case"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#1a1c1c]">{item.quantity} cs</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2.5 py-1 text-[#3e4850] hover:text-[#00658d] transition-colors font-bold text-xs"
                            title="Increase 1 Case"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-[#00658d] text-base">
                            ${(effectivePrice * item.quantity).toFixed(2)}
                          </div>
                          {hasDiscount && (
                            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                              Bulk Tier Applied
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Cart Footer / Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#e2e2e2] space-y-4 shadow-lg">
              <div className="space-y-1.5 text-sm text-[#3e4850]">
                <div className="flex justify-between">
                  <span>Total Master Cartons</span>
                  <span className="font-semibold text-[#1a1c1c]">{cartCount} Cases ({totalBottles} Units)</span>
                </div>
                {bulkSavings > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Volume Tier Savings</span>
                    <span>-${bulkSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Freight Delivery</span>
                  <span className="font-semibold text-emerald-600">FREE Commercial Freight</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#e2e2e2] text-base font-bold text-[#1a1c1c]">
                  <span>Total Amount (Excl. Taxes)</span>
                  <span className="text-[#00658d] text-xl">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={checkout}
                className="w-full bg-[#00aeef] hover:bg-[#00658d] text-white font-bold py-4 rounded uppercase tracking-wider text-sm shadow-[0px_4px_20px_rgba(0,174,239,0.25)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Confirm Purchase Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[#6e7881]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00658d]" /> GST B2B Invoice
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#00aeef]" /> Commercial Truck Dispatch
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
