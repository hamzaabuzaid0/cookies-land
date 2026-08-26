import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { products as staticProducts } from '../data/products';
import { subscribeToOverrides } from '../utils/catalogOverridesRepo';
import { firebaseConfigured } from '../firebaseConfig';

const CatalogContext = createContext(null);

// Merges the static product definitions with live admin overrides
// (price / available / photo) from Firestore. Every product listing in the
// app reads from here instead of importing data/products.js directly, so an
// edit the owner makes shows up everywhere at once, no redeploy needed.
export function CatalogProvider({ children }) {
  const [overrides, setOverrides] = useState({});

  useEffect(() => {
    if (!firebaseConfigured) return undefined;
    return subscribeToOverrides(setOverrides);
  }, []);

  const products = useMemo(() => staticProducts.map((p) => {
    const o = overrides[p.id];
    if (!o) return p;
    return {
      ...p,
      price: o.price ?? p.price,
      available: o.available ?? true,
      image: o.imageDataUrl || p.image,
    };
  }), [overrides]);

  return <CatalogContext.Provider value={{ products }}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used inside a CatalogProvider');
  return ctx;
}
