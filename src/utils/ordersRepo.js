import {
  collection, addDoc, doc, updateDoc, onSnapshot, query, orderBy, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ORDERS_COLLECTION = 'orders';

// Statuses: 'pending_payment_confirmation' -> 'preparing'. Kept to just
// these two — that's the whole lifecycle asked for (nothing after
// "preparing" was requested, e.g. no separate "ready"/"completed" state).
export async function createOrderTicket({
  ticketId, source, items, customItem, fulfillment,
  subtotal, deliveryFee, total, depositAmount, paymentScreenshotDataUrl,
}) {
  await addDoc(collection(db, ORDERS_COLLECTION), {
    ticketId,
    source, // 'cart' | 'custom'
    items: items || null,
    customItem: customItem || null,
    fulfillment,
    subtotal: subtotal ?? null,
    deliveryFee: deliveryFee ?? null,
    total: total ?? null,
    depositAmount,
    paymentScreenshotDataUrl, // compressed image string, see utils/compressImage.js
    status: 'pending_payment_confirmation',
    createdAt: serverTimestamp(),
  });

  return ticketId;
}

// Live-updating ticket list for the owner dashboard.
export function subscribeToOrders(callback) {
  const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ docId: d.id, ...d.data() })));
  });
}

export async function updateOrderStatus(docId, status) {
  await updateDoc(doc(db, ORDERS_COLLECTION, docId), { status });
}
