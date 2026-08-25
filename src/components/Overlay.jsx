import { useDrawer } from '../context/DrawerContext';

export function Overlay() {
  const { cartOpen, closeCart } = useDrawer();
  return <div className={'overlay' + (cartOpen ? ' show' : '')} onClick={closeCart} />;
}
