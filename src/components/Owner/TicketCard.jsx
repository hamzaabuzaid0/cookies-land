import { useLanguage } from '../../i18n/LanguageContext';
import { updateOrderStatus } from '../../utils/ordersRepo';
import { buildReceivedNotifyMessage, buildPreparingNotifyMessage } from '../../utils/buildNotifyMessage';
import { productName } from '../../utils/productName';
import { Ltr } from '../../utils/Ltr';

function openWhatsapp({ text, phone }) {
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}

export function TicketCard({ ticket }) {
  const { lang, t } = useLanguage();
  const f = ticket.fulfillment || {};

  const notifyReceived = () => openWhatsapp(buildReceivedNotifyMessage(ticket));

  const confirmAndNotifyPreparing = async () => {
    await updateOrderStatus(ticket.docId, 'preparing');
    openWhatsapp(buildPreparingNotifyMessage(ticket));
  };

  return (
    <div className="ticket-card">
      <div className="ticket-card-head">
        <span className="ticket-id"><Ltr>{ticket.ticketId}</Ltr></span>
        <span className={'status-badge ' + (ticket.status === 'preparing' ? 'status-preparing' : 'status-pending')}>
          {ticket.status === 'preparing' ? t('statusPreparing') : t('statusPending')}
        </span>
      </div>

      <div className="ticket-row"><span>{t('ticketFromLabel')}</span><span>{f.name}</span></div>
      <div className="ticket-row"><span>{t('ticketPhoneLabel')}</span><span><Ltr>{f.phone}</Ltr></span></div>
      <div className="ticket-row">
        <span>{t('ticketFulfillmentLabel')}</span>
        <span>{f.mode === 'delivery' ? `${t('delivery')} — ${f.address}` : t('pickup')}</span>
      </div>

      <div className="ticket-row" style={{ alignItems: 'flex-start' }}>
        <span>{t('ticketItemsLabel')}</span>
        <span style={{ textAlign: 'end' }}>
          {ticket.source === 'custom' ? (
            <>
              {ticket.customItem?.description}
              {ticket.customItem?.quantity ? ` (${ticket.customItem.quantity})` : ''}
              {ticket.customItem?.date ? <><br />{t('dateNeededLabel')}: <Ltr>{ticket.customItem.date}</Ltr></> : null}
            </>
          ) : (
            (ticket.items || []).map((it, i) => (
              <div key={i}>{productName(it, lang)} × {it.qty}</div>
            ))
          )}
        </span>
      </div>

      {f.notes && <div className="ticket-row"><span>{t('notesLabel')}</span><span>{f.notes}</span></div>}

      {ticket.total != null && (
        <div className="ticket-row"><span>{t('ticketTotalLabel')}</span><span><Ltr>{ticket.total} {t('egp')}</Ltr></span></div>
      )}
      <div className="ticket-row"><span>{t('ticketDepositLabel')}</span><span><Ltr>{ticket.depositAmount} {t('egp')}</Ltr></span></div>

      {ticket.paymentScreenshotUrl && (
        <a href={ticket.paymentScreenshotUrl} target="_blank" rel="noopener noreferrer">
          <img className="ticket-screenshot" src={ticket.paymentScreenshotUrl} alt={t('viewScreenshotLabel')} />
        </a>
      )}

      <div className="ticket-actions">
        <button type="button" className="fulfillment-btn" onClick={notifyReceived}>{t('notifyReceivedBtn')}</button>
        {ticket.status !== 'preparing' && (
          <button type="button" className="fulfillment-btn active" onClick={confirmAndNotifyPreparing}>
            {t('confirmPaymentBtn')}
          </button>
        )}
      </div>
    </div>
  );
}
