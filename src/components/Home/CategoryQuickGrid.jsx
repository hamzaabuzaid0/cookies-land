import { useLanguage } from '../../i18n/LanguageContext';
import { categories } from '../../data/categories';
import { CategoryVisual } from '../../utils/categoryVisual';

export function CategoryQuickGrid() {
  const { lang, t } = useLanguage();

  return (
    <section className="cat-quick-section">
      <h2 className="section-title">{t('shopByCategory')}</h2>
      <div className="cat-quick-grid">
        {categories.map((c) => (
          <a className="cat-quick-card" href={`#cat-${c.id}`} key={c.id}>
            <div className="cat-quick-icon">
              <CategoryVisual catId={c.id} size="28px" />
            </div>
            <div className="cat-quick-label">{lang === 'ar' ? c.ar : c.en}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
