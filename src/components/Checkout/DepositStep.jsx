import { useLanguage } from '../../i18n/LanguageContext';
import { business } from '../../data/business';
import { Ltr } from '../../utils/Ltr';

export function DepositStep({ checkout, onSubmit, onBack }) {
  const { t } = useLanguage();

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    checkout.setScreenshot(file || null);
  };

  return (
    <div className="deposit-step">
      <h3 className="deposit-title">{t('depositTitle')}</h3>
      <p className="account-hint">{t('depositIntro')}</p>

      <div className="deposit-box">
        <div className="deposit-row">
          <span>{t('depositAmountLabel')}</span>
          <span className="deposit-amount"><Ltr>{business.depositAmount} {t('egp')}</Ltr></span>
        </div>
        <div className="deposit-row">
          <span>{t('payToLabel')}</span>
          <span><Ltr>{business.instapayNumber}</Ltr></span>
        </div>
        <div className="deposit-row">
          <span>{t('payToNameLabel')}</span>
          <span>{business.instapayName}</span>
        </div>
      </div>

      <label className="form-label">{t('uploadScreenshotLabel')}</label>
      <p className="upload-hint">{t('uploadScreenshotHint')}</p>
      <input className="form-input" type="file" accept="image/*" onChange={handleFile} />
      {checkout.screenshot && (
        <img className="screenshot-preview" src={URL.createObjectURL(checkout.screenshot)} alt="" />
      )}

      {checkout.error && <div className="form-error">{t(checkout.error)}</div>}

      <div className="deposit-actions">
        <button type="button" className="fulfillment-btn" onClick={onBack}>{t('backToOrder')}</button>
        <button
          type="button"
          className="wa-order-btn submit-ticket-btn"
          disabled={checkout.phase === 'submitting'}
          onClick={onSubmit}
        >
          <span>{checkout.phase === 'submitting' ? t('submitting') : t('submitTicket')}</span>
        </button>
      </div>
    </div>
  );
}
