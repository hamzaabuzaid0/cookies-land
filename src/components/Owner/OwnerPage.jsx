import { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { subscribeToOrders } from '../../utils/ordersRepo';
import { firebaseConfigured } from '../../firebaseConfig';
import { PinGate } from './PinGate';
import { TicketCard } from './TicketCard';

function OwnerTickets() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!firebaseConfigured) return undefined;
    const unsubscribe = subscribeToOrders((list) => { setOrders(list); setLoaded(true); });
    return unsubscribe;
  }, []);

  return (
    <div className="owner-page">
      <div className="owner-header">
        <h1>{t('ownerPageTitle')}</h1>
        <p className="refresh-hint">{t('refreshHint')}</p>
      </div>

      {!firebaseConfigured && (
        <div className="form-error owner-config-warning">
          Firebase isn't configured yet — src/firebaseConfig.js still has placeholder values, so
          no tickets can load. See SETUP.md.
        </div>
      )}

      <div className="ticket-list">
        {firebaseConfigured && loaded && orders.length === 0 && (
          <div className="cart-empty">{t('ticketListEmpty')}</div>
        )}
        {orders.map((ticket) => (
          <TicketCard key={ticket.docId} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

export function OwnerPage() {
  return (
    <PinGate>
      <OwnerTickets />
    </PinGate>
  );
}
