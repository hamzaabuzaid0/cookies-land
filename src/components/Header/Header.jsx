import { useLanguage } from '../../i18n/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useDrawer } from '../../context/DrawerContext';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from './BrandLogo';

export function Header() {
  const { lang, t, toggleLang } = useLanguage();
  const { itemCount } = useCart();
  const { openCart, openAuth, adminView, setAdminView } = useDrawer();
  const { user, isAdmin, signOut } = useAuth();

  return (
    <header>
      <div className="top-bar">
        <div className="brand">
          <BrandLogo />
          <div>
            <div className="brand-name">{t('brandName')}</div>
            <div className="brand-sub">{t('tagline')}</div>
          </div>
        </div>
        <div className="header-actions">
          <button className="lang-toggle" onClick={toggleLang}>
            {lang === 'ar' ? 'English' : 'عربي'}
          </button>
          {user ? (
            <button className="cart-btn" onClick={signOut}>
              <span>👤</span>
              <span>{user.displayName || user.email} — {t('logoutBtn')}</span>
            </button>
          ) : (
            <button className="cart-btn" onClick={openAuth}>
              <span>👤</span>
              <span>{t('accountBtn')}</span>
            </button>
          )}
          {!adminView && (
            <button className="cart-btn" onClick={openCart}>
              <span>🛒</span>
              <span>{t('cart')}</span>
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </button>
          )}
        </div>
      </div>
      <nav className="site-nav">
        <div className="site-nav-inner">
          {adminView ? (
            <button className="nav-link active" onClick={() => setAdminView(false)}>{t('backToStore')}</button>
          ) : (
            <>
              <a className="nav-link" href="#shop">{t('navShop')}</a>
              <a className="nav-link" href="#custom-order">{t('navCustomOrder')}</a>
              <a className="nav-link" href="#about">{t('navAbout')}</a>
              {isAdmin && (
                <button className="nav-link admin-nav-link" onClick={() => setAdminView(true)}>
                  {t('adminNav')}
                </button>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
