import { useState, useEffect } from 'react';

// No router dependency needed for one extra hidden page — just watch
// location.hash. Used to show the /owner ticket dashboard instead of the
// storefront.
export function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}
