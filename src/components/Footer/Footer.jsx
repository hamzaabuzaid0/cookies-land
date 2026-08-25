import { useLanguage } from '../../i18n/LanguageContext';
import { business } from '../../data/business';
import { Ltr } from '../../utils/Ltr';

export function Footer() {
  const { t } = useLanguage();

  return (
    <>
      <section id="about" className="about-section">
        <div className="about-card">
          <div className="about-text">
            <h2>{t('aboutTitle')}</h2>
            <p>{t('aboutText')}</p>
          </div>
          <div className="about-stats">
            <div className="stat-box">
              <div className="stat-label">{t('locationLabel')}</div>
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginTop: 4, textDecoration: 'underline' }}
              >
                {t('locationValue')}
              </a>
            </div>
            <div className="stat-box">
              <div className="stat-label">{t('whatsappLabel')}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: 4 }}>
                <Ltr>{business.whatsappDisplay}</Ltr>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="foot-follow">
          <span>{t('followUs')}:</span>
          <a href={business.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
        <div className="foot-note">{t('footerNote')}</div>
      </footer>
    </>
  );
}
