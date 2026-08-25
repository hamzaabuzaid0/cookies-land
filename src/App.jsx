import { LanguageProvider } from './i18n/LanguageContext';
import { CartProvider } from './context/CartContext';
import { DrawerProvider } from './context/DrawerContext';

import { Header } from './components/Header/Header';
import { Hero } from './components/Home/Hero';
import { CategoryQuickGrid } from './components/Home/CategoryQuickGrid';
import { ShopSections } from './components/Shop/ShopSections';
import { CustomOrderForm } from './components/CustomOrder/CustomOrderForm';
import { Footer } from './components/Footer/Footer';
import { Overlay } from './components/Overlay';
import { CartDrawer } from './components/Cart/CartDrawer';

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <DrawerProvider>
          <Header />
          <Hero />
          <CategoryQuickGrid />
          <ShopSections />
          <CustomOrderForm />
          <Footer />
          <Overlay />
          <CartDrawer />
        </DrawerProvider>
      </CartProvider>
    </LanguageProvider>
  );
}
