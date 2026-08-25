# Setup — before this site actually works

Two things need real values before the ticket system functions. Everything
else (products, translations, colors) is already wired up.

## 1. Firebase project (free, no credit card)

1. Go to https://console.firebase.google.com → **Add project** → name it
   anything (e.g. `cookies-land`) → skip Google Analytics, it's not needed.
2. In the left sidebar: **Build → Firestore Database → Create database**.
   Choose a region close to Egypt (e.g. `europe-west1`), start in
   **test mode** (we'll paste real rules from `firestore.rules` right after).
3. **Build → Storage → Get started**. Same region, test mode.
4. Once both exist, open **Firestore → Rules** and replace the contents with
   this repo's [`firestore.rules`](firestore.rules), then **Publish**. Do the
   same for **Storage → Rules** with [`storage.rules`](storage.rules).
5. Click the gear icon → **Project settings** → scroll to **Your apps** →
   click the **</>** (web) icon → register an app (any nickname) → it shows a
   `firebaseConfig` object. Copy those 6 values into
   [`src/firebaseConfig.js`](src/firebaseConfig.js), replacing every `'TODO'`.
6. Rebuild (`npm run build`) and redeploy — the ticket system is now live.

**Security reminder:** the rules above are wide open (no login check) so the
demo works without building an auth system. Before this ever touches a real
customer's phone number, address, and payment screenshot, add Firebase Auth
and restrict `orders` read/update to a signed-in owner account.

## 2. Real business details

Edit [`src/data/business.js`](src/data/business.js):
- `depositAmount` — currently a placeholder (50 EGP).
- `instapayNumber` / `instapayName` — currently `'TODO'`, the deposit step
  can't tell customers where to send money until these are real.
- `ownerPin` — currently `'1234'`. Change it before sharing the `/owner`
  link with anyone. This is a UX gate, not real security (see above).

## 3. Using the owner dashboard

Open the site and add `#/owner` to the URL (e.g.
`https://yoursite.com/#/owner`). Enter the PIN from `business.js`. New orders
appear automatically (Firestore live updates — no refresh needed). Each
ticket has two buttons: one opens WhatsApp pre-filled to tell the customer
their order was received, the other confirms payment (updates the ticket)
*and* opens WhatsApp pre-filled to say it's being prepared — tap send in
WhatsApp to actually deliver each message.
