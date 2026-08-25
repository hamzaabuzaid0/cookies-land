import { useLanguage } from '../../i18n/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="hero-inner">
        <h1>{t('heroTitle')}</h1>
        <p>{t('heroSubtitle')}</p>
        <div className="hero-cta">
          <a className="hero-btn primary" href="#shop">{t('heroCtaShop')}</a>
          <a className="hero-btn secondary" href="#custom-order">{t('heroCtaCustom')}</a>
        </div>
        <div className="hero-badges">
          <span className="hero-badge">📍 {t('heroBadgePickup')}</span>
          <span className="hero-badge">🚚 {t('heroBadgeDelivery')}</span>
          <span className="hero-badge">📲 {t('heroBadgeWhatsapp')}</span>
        </div>
      </div>
    </section>
  );
}
