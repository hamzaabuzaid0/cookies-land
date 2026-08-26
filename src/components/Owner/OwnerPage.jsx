import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { subscribeToOrders } from '../../utils/ordersRepo';
import { firebaseConfigured } from '../../firebaseConfig';
import { requestNotificationPermission, notifyNewOrder } from '../../utils/notify';
import { TicketCard } from './TicketCard';
import { CatalogEditor } from './CatalogEditor';

function isToday(ts) {
  if (!ts?.toDate) return false;
  const d = ts.toDate();
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
}

// Rendered only when the signed-in account is the admin account (checked in
// App.jsx before this ever mounts) — no separate URL or PIN anymore, this is
// just another section of the same page, gated by real Firebase Auth.
export function AdminSection() {
  const { t } = useLanguage();
  const [tab, setTab] = useState('tickets'); // 'tickets' | 'catalog'
  const [showCompleted, setShowCompleted] = useState(false);
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

  const stats = useMemo(() => ({
    pending: orders.filter((o) => o.status === 'pending_payment_confirmation').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    today: orders.filter((o) => isToday(o.createdAt)).length,
  }), [orders]);

  const visibleOrders = orders.filter((o) => (showCompleted ? o.status === 'completed' : o.status !== 'completed'));

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

      <div className="account-tabs owner-tabs">
        <button type="button" className={'account-tab' + (tab === 'tickets' ? ' active' : '')} onClick={() => setTab('tickets')}>
          {t('ticketsTab')}
        </button>
        <button type="button" className={'account-tab' + (tab === 'catalog' ? ' active' : '')} onClick={() => setTab('catalog')}>
          {t('catalogTab')}
        </button>
      </div>

      {tab === 'tickets' ? (
        <>
          <div className="owner-stats">
            <div className="owner-stat"><span>{stats.pending}</span>{t('statPending')}</div>
            <div className="owner-stat"><span>{stats.preparing}</span>{t('statPreparing')}</div>
            <div className="owner-stat"><span>{stats.today}</span>{t('statToday')}</div>
          </div>

          <div className="fulfillment-toggle owner-completed-toggle">
            <button type="button" className={'fulfillment-btn' + (!showCompleted ? ' active' : '')} onClick={() => setShowCompleted(false)}>
              {t('showActiveBtn')}
            </button>
            <button type="button" className={'fulfillment-btn' + (showCompleted ? ' active' : '')} onClick={() => setShowCompleted(true)}>
              {t('showCompletedBtn')}
            </button>
          </div>

          <div className="ticket-list">
            {firebaseConfigured && loaded && visibleOrders.length === 0 && (
              <div className="cart-empty">{t('ticketListEmpty')}</div>
            )}
            {visibleOrders.map((ticket) => (
              <TicketCard key={ticket.docId} ticket={ticket} />
            ))}
          </div>
        </>
      ) : (
        <CatalogEditor />
      )}
    </div>
  );
}
