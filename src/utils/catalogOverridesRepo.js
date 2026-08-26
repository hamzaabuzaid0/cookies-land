import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const OVERRIDES_COLLECTION = 'catalogOverrides';

// Lets the admin change price / availability / photo without a code
// deploy. Structural stuff (name, category, unit) still lives in
// src/data/products.js — only what actually changes often is editable live.
// Doc id == product.id (e.g. 'p3'). Missing doc = use the static defaults.
export function subscribeToOverrides(callback) {
  return onSnapshot(collection(db, OVERRIDES_COLLECTION), (snap) => {
    const map = {};
    snap.docs.forEach((d) => { map[d.id] = d.data(); });
    callback(map);
  });
}

export async function saveOverride(productId, override) {
  await setDoc(doc(db, OVERRIDES_COLLECTION, productId), override, { merge: true });
}
