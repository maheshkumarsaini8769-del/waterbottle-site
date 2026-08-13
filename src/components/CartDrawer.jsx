import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useSite } from '../context/SiteContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, FileSpreadsheet, CheckCircle2, Phone, MessageCircle, RefreshCw } from 'lucide-react';

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

  const phoneDigits = (config.contact.phone || '').replace(/[^\d]/g, '');
  const telHref = `tel:+${phoneDigits}`;
  const waHref = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
    placedOrder
      ? `Hello, I would like to confirm my order ${placedOrder.id} with ${config.site.name}.`
      : `Hello ${config.site.name}! I would like to place a bulk water order.`
  )}`;

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
                <h2 className="text-lg font-bold text-[#1a1c1c]">
                  {placedOrder && cartItems.length === 0 ? 'Your Order' : 'Wholesale Order'}
                </h2>
                <p className="text-xs text-[#3e4850]">
                  {placedOrder && cartItems.length === 0
                    ? `Order ID: ${placedOrder.id}`
                    : `${cartCount} Cases • ${totalBottles} Individual Bottles`}
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

          {/* Update-Existing-Order Banner */}
          {placedOrder && cartItems.length > 0 && (
            <div className="bg-amber-50 px-5 sm:px-6 py-3 border-b border-amber-200 flex items-center gap-2.5 text-xs text-amber-800 font-semibold">
              <RefreshCw className="w-4 h-4 shrink-0 text-amber-600" />
              <span>
                You already have order <strong>{placedOrder.id}</strong> — confirming will <strong>update</strong> it, not place a new one.
              </span>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-4">
            {/* ---- Placed order summary view (check later) ---- */}
            {placedOrder && cartItems.length === 0 ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center text-center space-y-1.5 pt-2">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-black text-[#1a1c1c]">Order Placed!</h3>
                  <p className="text-xs text-[#6e7881] font-semibold uppercase tracking-wider">
                    Order ID: {placedOrder.id}
                  </p>
                </div>

                {/* Items list */}
                <div className="bg-white border border-[#e2e2e2] rounded-xl overflow-hidden">
                  <div className="px-4 py-2.5 bg-[#f8fafc] border-b border-[#e2e2e2] text-xs font-bold text-[#64748b] uppercase tracking-wider">
                    What you ordered ({placedOrder.items.length} products)
                  </div>
                  {placedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 px-4 py-3 border-b border-[#eeeeee] last:border-b-0">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="w-9 h-14 object-contain bg-[#f9f9f9] rounded border border-[#eeeeee]" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-[#1a1c1c] truncate">{item.title}</div>
                        <div className="text-[11px] text-[#6e7881]">
                          {item.quantity} Cases ({item.quantity * item.unitsPerCase} bottles)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-[#00658d]">
                          {config.site.currency}{(item.pricePerCase * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-[10px] text-[#6e7881]">{config.site.currency}{item.pricePerCase.toFixed(2)}/case</div>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-3 flex justify-between text-sm font-black text-[#1a1c1c] bg-[#f8fafc] border-t border-[#e2e2e2]">
                    <span>Total ({placedOrder.count} Cases / {placedOrder.bottles} bottles)</span>
                    <span style={{ color: config.colors.dark }}>{config.site.currency}{placedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-[#00aeef]/10 border border-[#00aeef]/30 rounded-xl p-4 text-sm text-[#1a1c1c] font-medium">
                  🚚 Our {config.site.name} team will call you within a few minutes to confirm delivery.
                  <span className="block mt-1.5 font-bold" style={{ color: config.colors.dark }}>
                    Need it faster? Call us right now!
                  </span>
                </div>

                <div className="w-full space-y-2.5">
                  <a href={telHref} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3.5 rounded-xl uppercase tracking-wider text-sm shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98]">
                    <Phone className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                    Call Now
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#1fb959] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-sm shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4.5 h-4.5 fill-white" style={{ width: 18, height: 18 }} />
                    WhatsApp Us
                  </a>
                  <button
                    onClick={() => { setIsCartOpen(false); onNavigate('product'); }}
                    className="w-full bg-[#f9f9f9] hover:bg-[#eeeeee] text-[#00658d] font-bold py-3 rounded-xl uppercase tracking-wider text-xs transition-colors"
                  >
                    Add More Items
                  </button>
                  <button
                    onClick={() => { if (confirm('Remove this order?')) { clearPlacedOrder(); } }}
                    className="w-full text-rose-500 hover:text-rose-700 text-xs font-bold py-2 transition-colors"
                  >
                    Remove Order
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
                            {config.site.currency}{(effectivePrice * item.quantity).toFixed(2)}
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
                    <span>-{config.site.currency}{bulkSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Freight Delivery</span>
                  <span className="font-semibold text-emerald-600">FREE Commercial Freight</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#e2e2e2] text-base font-bold text-[#1a1c1c]">
                  <span>Total Amount (Excl. Taxes)</span>
                  <span className="text-[#00658d] text-xl">
                    {config.site.currency}{cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={checkout}
                className="w-full bg-[#00aeef] hover:bg-[#00658d] text-white font-bold py-4 rounded uppercase tracking-wider text-sm shadow-[0px_4px_20px_rgba(0,174,239,0.25)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
                style={{ backgroundColor: config.colors.primary }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = config.colors.dark)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = config.colors.primary)}
              >
                {placedOrder ? (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Update Existing Order</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Purchase Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
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