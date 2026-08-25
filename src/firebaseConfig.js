import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// PLACEHOLDER CONFIG — the ticket system will not work until this is
// replaced with a real Firebase project's config. See SETUP.md for the
// walkthrough (free "Spark" plan, no credit card needed):
//   1. console.firebase.google.com → Add project
//   2. Build/Databases > Firestore Database → Create database (test mode)
//   3. Project settings (gear icon) > General > Your apps > Add app > Web
//   4. Copy the firebaseConfig object it gives you and paste it below.
//
// NOTE: no Firebase Storage here on purpose — as of late 2024 Google
// requires the paid Blaze plan for Storage even at trivial usage. Payment
// screenshots are instead compressed client-side and stored as a string
// directly in the Firestore document (see src/utils/compressImage.js),
// which stays on the free plan.
const firebaseConfig = {
  apiKey: 'TODO',
  authDomain: 'TODO.firebaseapp.com',
  projectId: 'TODO',
  appId: 'TODO',
};

export const firebaseConfigured = firebaseConfig.apiKey !== 'TODO';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
