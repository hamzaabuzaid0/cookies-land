import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { business } from '../../data/business';
import { useFulfillmentForm } from '../../utils/useFulfillmentForm';
import { useTicketCheckout } from '../../utils/useTicketCheckout';
import { FulfillmentFields } from '../FulfillmentFields';
import { DepositStep } from '../Checkout/DepositStep';
import { TicketSuccess } from '../Checkout/TicketSuccess';

export function CustomOrderForm() {
  const { t } = useLanguage();
  const form = useFulfillmentForm();
  const checkout = useTicketCheckout();
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [formError, setFormError] = useState('');

  const handleContinue = () => {
    if (!item.trim() || !form.name.trim() || !form.phone.trim()) {
      setFormError(t('customOrderFillRequired'));
      return;
    }
    if (form.mode === 'delivery' && !form.address.trim()) {
      setFormError(t('fillRequiredFields'));
      return;
    }
    setFormError('');
    checkout.goToDeposit();
  };

  const handleSubmit = () => {
    checkout.submit({
      source: 'custom',
      customItem: { description: item, quantity, date, notes: form.notes },
      fulfillment: {
        mode: form.mode, name: form.name, phone: form.phone, address: form.address, notes: form.notes,
      },
      depositAmount: business.depositAmount,
    });
  };

  const handleReset = () => {
    setItem('');
    setQuantity('');
    setDate('');
    checkout.reset();
  };

  return (
    <section id="custom-order" className="custom-order-section">
      <div className="custom-order-card">
        <h2 className="section-title">{t('customOrderTitle')}</h2>

        {checkout.phase === 'success' ? (
          <TicketSuccess ticketId={checkout.ticketId} onReset={handleReset} />
        ) : checkout.phase === 'form' ? (
          <>
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
            {formError && <div className="form-error">{formError}</div>}

            <button className="wa-order-btn" onClick={handleContinue}>
              <span>{t('continueToDeposit')}</span>
            </button>
          </>
        ) : (
          <DepositStep checkout={checkout} onSubmit={handleSubmit} onBack={checkout.backToForm} />
        )}
      </div>
    </section>
  );
}
