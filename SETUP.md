# Setup — before this site actually works

Everything (products, translations, colors, the ticket system, admin login)
is already wired up against a real Firebase project (`cookies-land-27142`).
This doc is for reference if you ever need to point the site at a
*different* Firebase project, or are setting one up from scratch.

## 1. Firebase project (free, no credit card)

Note: no Firebase **Storage** here — as of late 2024 Google requires the
paid Blaze plan for Storage even at trivial usage, which isn't worth asking
for on a pitch demo. Payment screenshots are compressed client-side and
stored as a string directly in Firestore instead (see
`src/utils/compressImage.js`), so only **Firestore** + **Authentication**
are needed — both stay on the free Spark plan.

1. Go to https://console.firebase.google.com → **Add project**.
2. **Firestore Database** → **Create database** → any region → start in
   test mode, then immediately replace the rules with this repo's
   [`firestore.rules`](firestore.rules) and **Publish**.
3. **Authentication** → **Get started** → enable the **Email/Password**
   sign-in provider (that's it — no OAuth apps or verification needed).
4. **Project settings** (gear icon) → **Your apps** → **`</>`** (web) →
   register an app → copy the `firebaseConfig` values into
   [`src/firebaseConfig.js`](src/firebaseConfig.js).
5. `npm run build` and redeploy.

## 2. Admin login

There's no PIN or hidden URL anymore — it's a real account. Whoever signs
up on the site with the email set in `business.js`'s `adminEmail` (and
hardcoded into `firestore.rules` — **the two must match exactly**, since
rules can't read the JS file) gets the admin view: an "Admin Dashboard" nav
link appears in the header for that account only, showing:
- **Orders tab** — live ticket list, stats (pending/preparing/today), one-tap
  WhatsApp status buttons, and a completed-orders archive.
- **Manage Products tab** — edit price, toggle availability, and upload a
  photo per item, no code changes or redeploy needed. Read by everyone
  (customers need to see current prices/photos), written only by the admin
  account (see `catalogOverrides` in `firestore.rules`).

The admin account itself is order-restricted (see `App.jsx`/`Header.jsx`) —
no cart, no custom order form, no add-to-cart — it's a management view only.

## 3. Real business details

Edit [`src/data/business.js`](src/data/business.js):
- `depositAmount`, `instapayNumber`, `instapayName` — the deposit step.
- `deliveryFee` — still an UNCONFIRMED placeholder.
- `adminEmail` — see above.

## 4. Security note

`firestore.rules` already requires the signed-in admin account for reading
or updating tickets (which include customer names, phones, addresses, and
payment screenshots) — this isn't a demo-only gap anymore. If you ever add
a second admin/staff account, add their email to the rules' `||` condition
too.
