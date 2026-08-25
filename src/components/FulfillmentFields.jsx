import { useLanguage } from '../i18n/LanguageContext';

// Reusable pickup/delivery + contact fields, shared by the cart checkout
// footer and the custom order form. `form` is a useFulfillmentForm() result.
export function FulfillmentFields({ form }) {
  const { t } = useLanguage();

  return (
    <div>
      <label className="form-label">{t('fulfillmentTitle')}</label>
      <div className="fulfillment-toggle">
        <button
          type="button"
          className={'fulfillment-btn' + (form.mode === 'pickup' ? ' active' : '')}
          onClick={() => form.setMode('pickup')}
        >
          {t('pickup')}
        </button>
        <button
          type="button"
          className={'fulfillment-btn' + (form.mode === 'delivery' ? ' active' : '')}
          onClick={() => form.setMode('delivery')}
        >
          {t('delivery')}
        </button>
      </div>

      <label className="form-label">{t('nameLabel')}</label>
      <input
        className="form-input"
        type="text"
        value={form.name}
        onChange={(e) => form.setName(e.target.value)}
      />

      <label className="form-label">{t('phoneLabel')}</label>
      <input
        className="form-input"
        type="tel"
        value={form.phone}
        onChange={(e) => form.setPhone(e.target.value)}
      />

      {form.mode === 'delivery' && (
        <>
          <label className="form-label">{t('addressLabel')}</label>
          <textarea
            className="form-input"
            rows={2}
            value={form.address}
            onChange={(e) => form.setAddress(e.target.value)}
          />
        </>
      )}

      <label className="form-label">{t('notesLabel')}</label>
      <textarea
        className="form-input"
        rows={2}
        value={form.notes}
        onChange={(e) => form.setNotes(e.target.value)}
      />
    </div>
  );
}
