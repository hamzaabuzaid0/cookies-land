import { useLanguage } from '../../i18n/LanguageContext';
import { categories } from '../../data/categories';
import { products } from '../../data/products';
import { ProductCard } from './ProductCard';

export function ShopSections() {
  const { lang } = useLanguage();

  return (
    <main id="shop">
      {categories.map((cat) => {
        const items = products.filter((p) => p.cat === cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} id={`cat-${cat.id}`}>
            <h2 className="section-title">{lang === 'ar' ? cat.ar : cat.en}</h2>
            <div className="grid">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
