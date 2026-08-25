// Short, human-readable ticket number the customer and owner both refer to
// (no login system, so this — not an internal Firestore doc ID — is what
// gets shown on screen and mentioned in WhatsApp messages).
export function generateTicketId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CL-${y}${m}${d}-${rand}`;
}
