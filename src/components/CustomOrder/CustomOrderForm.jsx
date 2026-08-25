import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { business } from '../../data/business';
import { buildCustomOrderMessage } from '../../utils/buildCustomOrderMessage';
import { useFulfillmentForm } from '../../utils/useFulfillmentForm';
import { FulfillmentFields } from '../FulfillmentFields';

export function CustomOrderForm() {
  const { t } = useLanguage();
  const form = useFulfillmentForm();
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSend = () => {
    if (!item.trim() || !form.name.trim() || !form.phone.trim()) {
      setError(t('customOrderFillRequired'));
      return;
    }
    if (form.mode === 'delivery' && !form.address.trim()) {
      setError(t('fillRequiredFields'));
      return;
    }
    setError('');
    const { text, phone } = buildCustomOrderMessage({
      form: { item, quantity, date, notes: form.notes },
      fulfillment: form,
      whatsapp: business.whatsapp,
    });
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="custom-order" className="custom-order-section">
      <div className="custom-order-card">
        <h2 className="section-title">{t('customOrderTitle')}</h2>
        <p className="account-hint">{t('customOrderIntro')}</p>

        <label className="form-label">{t('itemWantedLabel')}</label>
        <textarea
          className="form-input"
          rows={2}
          placeholder={t('itemWantedPlaceholder')}
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />

        <label className="form-label">{t('quantityLabel')}</label>
        <input className="form-input" type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

        <label className="form-label">{t('dateNeededLabel')}</label>
        <input className="form-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <FulfillmentFields form={form} />
        {error && <div className="form-error">{error}</div>}

        <button className="wa-order-btn" onClick={handleSend}>
          <span>📲</span>
          <span>{t('sendCustomOrder')}</span>
        </button>
      </div>
    </section>
  );
}
