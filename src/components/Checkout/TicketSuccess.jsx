import { useLanguage } from '../../i18n/LanguageContext';
import { Ltr } from '../../utils/Ltr';

export function TicketSuccess({ ticketId, onReset }) {
  const { t } = useLanguage();

  return (
    <div className="ticket-success">
      <div className="ticket-success-icon">🎉</div>
      <h3>{t('ticketCreatedTitle')}</h3>
      <p>{t('ticketCreatedBody')}: <strong><Ltr>{ticketId}</Ltr></strong></p>
      <p className="account-hint">{t('ticketCreatedNote')}</p>
      <button type="button" className="fulfillment-btn active" onClick={onReset}>
        {t('startNewOrder')}
      </button>
    </div>
  );
}
