import { createContext, useContext, useState, useCallback } from 'react';

const DrawerContext = createContext(null);

export function DrawerProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [categoryView, setCategoryView] = useState(null); // null | category id

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openAuth = useCallback(() => setAuthOpen(true), []);
  const closeAuth = useCallback(() => setAuthOpen(false), []);

  const value = {
    cartOpen, openCart, closeCart,
    authOpen, openAuth, closeAuth,
    adminView, setAdminView,
    categoryView, setCategoryView,
  };

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

export function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error('useDrawer must be used inside a DrawerProvider');
  return ctx;
}
