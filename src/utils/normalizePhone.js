// Customers type local numbers like "01012345678" — wa.me needs the full
// international form with no leading zero (e.g. "201012345678").
export function normalizeEgyptPhone(phone) {
  const digits = (phone || '').replace(/\D/g, '');
  if (digits.startsWith('20')) return digits;
  if (digits.startsWith('0')) return '20' + digits.slice(1);
  return '20' + digits;
}
