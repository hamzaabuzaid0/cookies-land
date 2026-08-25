import { translations } from '../i18n/translations';
import { productName } from './productName';

// The WhatsApp message is always written in Arabic (how the shop actually
// communicates) regardless of the site's current display language. Per-item
// prices are left out on purpose — only the subtotal/delivery/total are
// shown, matching what the cart itself displays.
export function buildWhatsappMessage({ cart, products, fulfillment, deliveryFee, whatsapp }) {
  const ar = translations.ar;
  const lines = [];
  lines.push(ar.waMsgIntro);
  lines.push('');

  lines.push(`${ar.waMsgFulfillment}: ${fulfillment.mode === 'delivery' ? ar.waMsgDelivery : ar.waMsgPickup}`);
  lines.push(`${ar.waMsgName}: ${fulfillment.name}`);
  lines.push(`${ar.waMsgPhone}: ${fulfillment.phone}`);
  if (fulfillment.mode === 'delivery') {
    lines.push(`${ar.waMsgAddress}: ${fulfillment.address}`);
  }
  if (fulfillment.notes) {
    lines.push(`${ar.waMsgNotes}: ${fulfillment.notes}`);
  }
  lines.push('');

  let subtotal = 0;
  Object.keys(cart).forEach((id) => {
    const p = products.find((pp) => pp.id === id);
    const qty = cart[id];
    subtotal += p.price * qty;
    lines.push(`• ${productName(p, 'ar')} x${qty}`);
  });
  lines.push('');

  const fee = fulfillment.mode === 'delivery' ? deliveryFee : 0;
  lines.push(`${ar.waMsgSubtotal}: ${subtotal} ${ar.egp}`);
  if (fulfillment.mode === 'delivery') {
    lines.push(`${ar.waMsgDeliveryFee}: ${fee} ${ar.egp}`);
  }
  lines.push(`${ar.waMsgFinalTotal}: ${subtotal + fee} ${ar.egp}`);
  lines.push(ar.waMsgConfirm);

  return { text: lines.join('\n'), phone: whatsapp };
}
