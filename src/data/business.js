// Confirmed from the Cookies Land Facebook page (facebook.com/c0okiesland) —
// name, location and WhatsApp number are real. deliveryFee is NOT confirmed
// (no pricing info exists yet anywhere) — placeholder, flag for the owner.
export const business = {
  nameAr: 'كوكيز لاند',
  nameEn: 'Cookies Land',
  whatsapp: '201150288114', // confirmed via Facebook page contact info
  whatsappDisplay: '011 5028 8114',
  facebookUrl: 'https://www.facebook.com/c0okiesland/',
  // Cleaned of the Facebook link-shim + tracking params (fbclid etc.) it
  // arrived wrapped in — this is just the underlying Google Maps short link.
  mapsUrl: 'https://maps.app.goo.gl/qfrNrQZsC1afNkyA7',
  instagramUrl: null, // the @coookieland37 handle originally given turned out to belong to a
  // different business (Khamis Mushait/Abha, Saudi Arabia) — left blank until the real
  // Cookies Land Instagram (if any) is confirmed.
  deliveryFee: 25, // UNCONFIRMED placeholder — ask the owner for the real fee (or whether it varies)

  // Deposit / ticket system
  depositAmount: 50,
  instapayNumber: '01150288114',
  instapayName: 'كوكيز لاند',

  // Whoever logs into the site with this exact email sees the admin/tickets
  // section — everyone else just gets a normal customer account. Sign up on
  // the site with this email to become admin. MUST match the email hardcoded
  // into firestore.rules (Firestore rules can't read this file) — if you
  // change this, update firestore.rules too and republish it.
  adminEmail: 'owner@cookiesland.demo',
};
