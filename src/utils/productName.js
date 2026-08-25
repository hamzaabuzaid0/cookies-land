// Unlike branded pharmacy products (always shown in their printed-package
// language), Cookies Land items are plain local names with a real
// translation both ways — so display just follows the current site language.
export function productName(product, lang) {
  return lang === 'ar' ? product.ar : product.en;
}
