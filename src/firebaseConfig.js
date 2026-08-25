import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// PLACEHOLDER CONFIG — the ticket system will not work until this is
// replaced with a real Firebase project's config. See SETUP.md for the
// 5-minute walkthrough (free "Spark" plan, no credit card needed):
//   1. console.firebase.google.com → Add project
//   2. Build > Firestore Database → Create database (start in test mode)
//   3. Build > Storage → Get started
//   4. Project settings (gear icon) > General > Your apps > Add app > Web
//   5. Copy the firebaseConfig object it gives you and paste it below.
const firebaseConfig = {
  apiKey: 'TODO',
  authDomain: 'TODO.firebaseapp.com',
  projectId: 'TODO',
  storageBucket: 'TODO.appspot.com',
  messagingSenderId: 'TODO',
  appId: 'TODO',
};

export const firebaseConfigured = firebaseConfig.apiKey !== 'TODO';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
