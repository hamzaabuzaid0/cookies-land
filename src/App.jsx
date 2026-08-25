import { LanguageProvider } from './i18n/LanguageContext';
import { CartProvider } from './context/CartContext';
import { DrawerProvider } from './context/DrawerContext';
import { useHashRoute } from './utils/useHashRoute';

import { Header } from './components/Header/Header';
import { Hero } from './components/Home/Hero';
import { CategoryQuickGrid } from './components/Home/CategoryQuickGrid';
import { ShopSections } from './components/Shop/ShopSections';
import { CustomOrderForm } from './components/CustomOrder/CustomOrderForm';
import { Footer } from './components/Footer/Footer';
import { Overlay } from './components/Overlay';
import { CartDrawer } from './components/Cart/CartDrawer';
import { OwnerPage } from './components/Owner/OwnerPage';

function Storefront() {
  return (
    <>
      <Header />
      <Hero />
      <CategoryQuickGrid />
      <ShopSections />
      <CustomOrderForm />
      <Footer />
      <Overlay />
      <CartDrawer />
    </>
  );
}

export default function App() {
  const hash = useHashRoute();
  const isOwnerRoute = hash.startsWith('#/owner');

  return (
    <LanguageProvider>
      <CartProvider>
        <DrawerProvider>
          {isOwnerRoute ? <OwnerPage /> : <Storefront />}
        </DrawerProvider>
      </CartProvider>
    </LanguageProvider>
  );
}
