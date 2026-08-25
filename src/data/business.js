// Confirmed from the Cookies Land Facebook page (facebook.com/c0okiesland) —
// name, location and WhatsApp number are real. deliveryFee is NOT confirmed
// (no pricing info exists yet anywhere) — placeholder, flag for the owner.
export const business = {
  nameAr: 'كوكيز لاند',
  nameEn: 'Cookies Land',
  whatsapp: '201150288114', // confirmed via Facebook page contact info
  whatsappDisplay: '011 5028 8114',
  facebookUrl: 'https://www.facebook.com/c0okiesland/',
  instagramUrl: null, // the @coookieland37 handle originally given turned out to belong to a
  // different business (Khamis Mushait/Abha, Saudi Arabia) — left blank until the real
  // Cookies Land Instagram (if any) is confirmed.
  deliveryFee: 25, // UNCONFIRMED placeholder — ask the owner for the real fee (or whether it varies)

  // Deposit / ticket system — all placeholders, none of this is confirmed yet.
  depositAmount: 50, // UNCONFIRMED — ask the owner what deposit she actually wants
  instapayNumber: 'TODO — owner\'s InstaPay / Vodafone Cash number', // MUST be filled before real use
  instapayName: 'TODO — name the payment should show under',

  // PIN for the /owner ticket dashboard. This is a UX gate only, NOT real
  // security — see src/firebaseConfig.js and firestore.rules for why. Change
  // this before sharing the link with the owner, and treat it as throwaway
  // until real auth is added.
  ownerPin: '1234',
};
