import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { subscribeToOrders } from '../../utils/ordersRepo';
import { firebaseConfigured } from '../../firebaseConfig';
import { requestNotificationPermission, notifyNewOrder } from '../../utils/notify';
import { TicketCard } from './TicketCard';

// Rendered only when the signed-in account is the admin account (checked in
// App.jsx before this ever mounts) — no separate URL or PIN anymore, this is
// just another section of the same page, gated by real Firebase Auth.
export function AdminSection() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // Tracks which tickets we've already alerted on, so a new ticket triggers
  // a notification + beep exactly once, and the very first load doesn't
  // re-alert on every ticket that already existed.
  const seenIds = useRef(null);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (!firebaseConfigured) return undefined;
    const unsubscribe = subscribeToOrders((list) => {
      if (seenIds.current === null) {
        seenIds.current = new Set(list.map((o) => o.docId));
      } else {
        list.forEach((o) => {
          if (!seenIds.current.has(o.docId)) {
            seenIds.current.add(o.docId);
            notifyNewOrder(o.ticketId);
          }
        });
      }
      setOrders(list);
      setLoaded(true);
    });
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
