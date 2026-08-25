import { translations } from '../i18n/translations';

// Custom/special order requests skip the cart entirely — no product IDs or
// prices involved, just a free-text description the shop follows up on
// directly. Always sent in Arabic, same reasoning as buildWhatsappMessage.
export function buildCustomOrderMessage({ form, fulfillment, whatsapp }) {
  const ar = translations.ar;
  const lines = [];
  lines.push(ar.waMsgCustomIntro);
  lines.push('');
  lines.push(`${ar.waMsgCustomItem}: ${form.item}`);
  if (form.quantity) lines.push(`${ar.waMsgCustomQty}: ${form.quantity}`);
  if (form.date) lines.push(`${ar.waMsgCustomDate}: ${form.date}`);
  if (form.notes) lines.push(`${ar.waMsgCustomNotes}: ${form.notes}`);
  lines.push('');
  lines.push(`${ar.waMsgFulfillment}: ${fulfillment.mode === 'delivery' ? ar.waMsgDelivery : ar.waMsgPickup}`);
  lines.push(`${ar.waMsgName}: ${fulfillment.name}`);
  lines.push(`${ar.waMsgPhone}: ${fulfillment.phone}`);
  if (fulfillment.mode === 'delivery') {
    lines.push(`${ar.waMsgAddress}: ${fulfillment.address}`);
  }
  lines.push('');
  lines.push(ar.waMsgCustomConfirm);

  return { text: lines.join('\n'), phone: whatsapp };
}
