import { createContext, useContext, useState, useCallback } from 'react';

const DrawerContext = createContext(null);

export function DrawerProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  return (
    <DrawerContext.Provider value={{ cartOpen, openCart, closeCart }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error('useDrawer must be used inside a DrawerProvider');
  return ctx;
}
