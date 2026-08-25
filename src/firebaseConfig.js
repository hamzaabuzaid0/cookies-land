import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Real project (created 2026-08-25, Spark/free plan). No Firebase Storage
// here on purpose — as of late 2024 Google requires the paid Blaze plan for
// Storage even at trivial usage. Payment screenshots are instead compressed
// client-side and stored as a string directly in the Firestore document
// (see src/utils/compressImage.js), which stays on the free plan.
const firebaseConfig = {
  apiKey: 'AIzaSyDMDWs7p-6OjaXrCU9MNeuyC93freHKFGE',
  authDomain: 'cookies-land-27142.firebaseapp.com',
  projectId: 'cookies-land-27142',
  messagingSenderId: '342482039208',
  appId: '1:342482039208:web:b97dc04cb1a47c8af42d9d',
};

export const firebaseConfigured = firebaseConfig.apiKey !== 'TODO';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
