// Real catalog, built from what the owner (relayed by Hamza) actually named:
// ready-to-cook mahshi & panée, rice/grilled kofta, frozen burger, Good
// France sauces, tres leches, ice cream, and a 12-loaf Kaiser bread bag.
// See PLACEHOLDER_PRICE below — no real prices exist yet for anything, so
// every item currently shows the same placeholder number with a visible
// "estimated price" note (see ProductCard) until the owner sends real ones.
//
// The `protein` category also includes generic chicken/red-meat cuts
// (confirmed: false) — Hamza explicitly OK'd filling that section with
// common cuts as a placeholder ("this is a demo") ahead of the owner's real
// list. Nothing outside `protein` was invented: every other item is exactly
// what was named. `confirmed: false` items render a small "preliminary"
// badge so nothing here is mistaken for real owner-provided data.
//
// `image: null` means no real product photo exists yet — ProductCard falls
// back to a category icon + "photo coming soon" note. Once real photos are
// available, drop them in src/assets/products/ and set `image` to the
// imported path.
export const PLACEHOLDER_PRICE = 100;

const rawProducts = [
  // Ready-to-cook meals
  {
    ar: 'محشي جاهز للتسوية',
    en: 'Ready-to-Cook Stuffed Vegetables (Mahshi)',
    cat: 'ready',
    confirmed: true,
    image: null,
  },
  {
    ar: 'بانيه جاهز للتسوية',
    en: 'Ready-to-Cook Breaded Cutlets (Panée)',
    cat: 'ready',
    confirmed: true,
    image: null,
  },

  // Protein & meat — confirmed items first
  { ar: 'كفتة رز', en: 'Rice Kofta', cat: 'protein', confirmed: true, image: null },
  { ar: 'كفتة مشوية', en: 'Grilled Kofta', cat: 'protein', confirmed: true, image: null },
  { ar: 'برجر مجمد', en: 'Frozen Burger Patties', cat: 'protein', confirmed: true, image: null },
  // Protein & meat — preliminary cuts (confirmed: false, see note above)
  { ar: 'دجاج كامل', en: 'Whole Chicken', cat: 'protein', confirmed: false, image: null },
  { ar: 'صدور دجاج', en: 'Chicken Breast', cat: 'protein', confirmed: false, image: null },
  { ar: 'أفخاذ دجاج', en: 'Chicken Thighs', cat: 'protein', confirmed: false, image: null },
  { ar: 'أجنحة دجاج', en: 'Chicken Wings', cat: 'protein', confirmed: false, image: null },
  { ar: 'لحم بقري مفروم', en: 'Beef Mince', cat: 'protein', confirmed: false, image: null },
  { ar: 'لحم بقري مقطع', en: 'Beef Cubes', cat: 'protein', confirmed: false, image: null },
  { ar: 'لحم ضاني', en: 'Lamb', cat: 'protein', confirmed: false, image: null },

  // Sauces & imports
  {
    ar: 'صوصات جود فرانس',
    en: 'Good France Sauces (assorted)',
    cat: 'sauces',
    confirmed: true,
    image: null,
  },

  // Desserts & ice cream
  { ar: 'تريس ليتشيس', en: 'Tres Leches', cat: 'desserts', confirmed: true, image: null },
  {
    ar: 'آيس كريم',
    en: 'Ice Cream (assorted flavors)',
    cat: 'desserts',
    confirmed: true,
    image: null,
  },

  // Bakery
  {
    ar: 'كيس عيش كايزر (١٢ رغيف)',
    en: 'Kaiser Bread (pack of 12)',
    cat: 'bakery',
    confirmed: true,
    image: null,
  },
];

export const products = rawProducts.map((p, i) => ({
  ...p,
  id: 'p' + i,
  price: PLACEHOLDER_PRICE,
}));
