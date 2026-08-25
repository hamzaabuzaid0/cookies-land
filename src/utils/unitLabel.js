// Per-item unit of measure — mahashi is sold by the tray, protein by the
// kilo, ice cream by the tub. Everything else has no special unit (plain
// count). `step` controls how much +/- moves per tap (protein moves by
// half-kilo, everything else by whole units).
const UNITS = {
  tray: { ar: 'صينية', en: 'Tray', step: 1 },
  kg: { ar: 'كيلو', en: 'kg', step: 0.5 },
  tub: { ar: 'علبة', en: 'Tub', step: 1 },
};

export function unitStep(product) {
  return (product.unit && UNITS[product.unit]?.step) || 1;
}

export function unitLabel(product, lang) {
  if (!product.unit || !UNITS[product.unit]) return '';
  return UNITS[product.unit][lang];
}

export function formatQty(qty, product, lang) {
  const label = unitLabel(product, lang);
  return label ? `${qty} ${label}` : `${qty}`;
}
