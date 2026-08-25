import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { categories } from '../../data/categories';
import { products } from '../../data/products';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';

// filterCategory: category id to show only that section (used by
// CategoryPage — clicking a category opens a dedicated page instead of
// scrolling), or omitted to show the full catalog (default shop view).
export function ShopSections({ filterCategory }) {
  const { lang } = useLanguage();
  const [openProduct, setOpenProduct] = useState(null);
  const cats = filterCategory ? categories.filter((c) => c.id === filterCategory) : categories;

  return (
    <main id="shop">
      {cats.map((cat) => {
        const items = products.filter((p) => p.cat === cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} id={`cat-${cat.id}`}>
            <h2 className="section-title">{lang === 'ar' ? cat.ar : cat.en}</h2>
            <div className="grid">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={setOpenProduct} />
              ))}
            </div>
          </section>
        );
      })}
      <ProductDetailModal product={openProduct} onClose={() => setOpenProduct(null)} />
    </main>
  );
}
