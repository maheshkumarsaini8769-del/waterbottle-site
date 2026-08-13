import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('aquapure_bulk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('aquapure_bulk_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const calculateItemPrice = (item, qty) => {
    const basePrice = item.pricePerCase || item.price;
    if (qty >= 50) return basePrice * 0.8; // 20% Pallet Discount
    if (qty >= 20) return basePrice * 0.9; // 10% Bulk Discount
    return basePrice;
  };

  const addToCart = (product, qty) => {
    const initialQty = qty || product.moq || 5;
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const newQty = existing.quantity + initialQty;
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQty }
            : item
        );
      } else {
        return [...prev, {
          id: product.id,
          title: product.title,
          pricePerCase: product.pricePerCase || product.price,
          price: product.pricePerCase || product.price,
          unitsPerCase: product.unitsPerCase || 24,
          packSize: product.packSize || '24 Bottles / Case',
          volume: product.volume,
          moq: product.moq || 5,
          image: product.image,
          quantity: initialQty
        }];
      }
    });

    showToast(`Added ${initialQty} Cases (${initialQty * (product.unitsPerCase || 24)} bottles) to Bulk Order`);
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === productId) {
            const minAllowed = item.moq || 5;
            const newQty = item.quantity + delta;
            if (newQty < minAllowed && delta < 0) {
              showToast(`Minimum order requirement is ${minAllowed} Cases`, 'info');
              return item;
            }
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    showToast('Case pack removed from bulk order', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkout = () => {
    if (cartItems.length === 0) return;
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log(err);
    }
    setPlacedOrder({
      id: 'WB-' + String(Date.now()).slice(-6),
      items: cartItems,
      total: cartTotal,
      count: cartCount,
      bottles: totalBottles
    });
    clearCart();
    setIsCartOpen(false);
    showToast('🎉 Bulk Purchase Order Placed! Our enterprise B2B team will contact you shortly.', 'success');
  };

  const clearPlacedOrder = () => setPlacedOrder(null);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0); // Total Cases
  const totalBottles = cartItems.reduce((sum, item) => sum + (item.quantity * (item.unitsPerCase || 24)), 0);
  
  const cartTotal = cartItems.reduce((sum, item) => {
    const effectivePrice = calculateItemPrice(item, item.quantity);
    return sum + effectivePrice * item.quantity;
  }, 0);

  const cartOriginalTotal = cartItems.reduce((sum, item) => {
    return sum + (item.pricePerCase || item.price) * item.quantity;
  }, 0);

  const bulkSavings = Math.max(0, cartOriginalTotal - cartTotal);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        checkout,
        placedOrder,
        clearPlacedOrder,
        cartCount,
        totalBottles,
        cartTotal,
        bulkSavings,
        calculateItemPrice,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
