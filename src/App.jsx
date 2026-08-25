import { LanguageProvider } from './i18n/LanguageContext';
import { CartProvider } from './context/CartContext';
import { DrawerProvider, useDrawer } from './context/DrawerContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import { Header } from './components/Header/Header';
import { Hero } from './components/Home/Hero';
import { CategoryQuickGrid } from './components/Home/CategoryQuickGrid';
import { ShopSections } from './components/Shop/ShopSections';
import { CustomOrderForm } from './components/CustomOrder/CustomOrderForm';
import { Footer } from './components/Footer/Footer';
import { Overlay } from './components/Overlay';
import { CartDrawer } from './components/Cart/CartDrawer';
import { AuthModal } from './components/Auth/AuthModal';
import { AdminSection } from './components/Owner/OwnerPage';

function Storefront() {
  return (
    <>
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

function Shell() {
  const { adminView } = useDrawer();
  const { isAdmin } = useAuth();

  return (
    <>
      <Header />
      {adminView && isAdmin ? <AdminSection /> : <Storefront />}
      <AuthModal />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <DrawerProvider>
            <Shell />
          </DrawerProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
