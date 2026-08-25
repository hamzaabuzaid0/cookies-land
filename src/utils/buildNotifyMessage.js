import { translations } from '../i18n/translations';
import { normalizeEgyptPhone } from './normalizePhone';

// One-tap WhatsApp messages the OWNER sends to the CUSTOMER from the ticket
// dashboard (see src/components/Owner/OwnerPage.jsx). Pre-filled and
// pre-addressed — she only has to tap send. This is the closest we can get
// to "automated" WhatsApp updates without the paid/verified WhatsApp
// Business API (see conversation notes on that tradeoff). Always Arabic,
// same reasoning as buildWhatsappMessage.
export function buildReceivedNotifyMessage(ticket) {
  const ar = translations.ar;
  const lines = [
    `${ar.notifyReceivedGreeting} ${ticket.fulfillment.name} 👋`,
    '',
    `${ar.notifyTicketLabel}: ${ticket.ticketId}`,
    ar.notifyReceivedBody,
  ];
  return { text: lines.join('\n'), phone: normalizeEgyptPhone(ticket.fulfillment.phone) };
}

export function buildPreparingNotifyMessage(ticket) {
  const ar = translations.ar;
  const lines = [
    `${ar.notifyPreparingGreeting} ${ticket.fulfillment.name} 🎉`,
    '',
    `${ar.notifyTicketLabel}: ${ticket.ticketId}`,
    ar.notifyPreparingBody,
  ];
  return { text: lines.join('\n'), phone: normalizeEgyptPhone(ticket.fulfillment.phone) };
}
