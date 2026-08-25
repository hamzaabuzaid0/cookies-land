import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { products } from '../data/products';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({}); // productId -> qty

  const changeQty = useCallback((id, delta) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      // Rounded to 1 decimal — protein moves in 0.5kg steps, and plain
      // float addition can otherwise leave artifacts like 1.2999999999998.
      const next = Math.max(0, Math.round((current + delta) * 10) / 10);
      const copy = { ...prev };
      if (next === 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });
  }, []);

  const removeItem = useCallback((id) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const { itemsTotal, itemCount } = useMemo(() => {
    let itemsTotal = 0;
    let itemCount = 0;
    Object.entries(cart).forEach(([id, qty]) => {
      const p = products.find((pp) => pp.id === id);
      if (!p) return;
      itemsTotal += p.price * qty;
      itemCount += qty;
    });
    return { itemsTotal, itemCount };
  }, [cart]);

  const value = { cart, changeQty, removeItem, clearCart, itemsTotal, itemCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside a CartProvider');
  return ctx;
}
