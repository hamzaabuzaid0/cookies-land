import { useLanguage } from '../../i18n/LanguageContext';
import { useDrawer } from '../../context/DrawerContext';
import { categories } from '../../data/categories';
import { CategoryVisual } from '../../utils/categoryVisual';

export function CategoryQuickGrid() {
  const { lang, t } = useLanguage();
  const { setCategoryView } = useDrawer();

  return (
    <section className="cat-quick-section">
      <h2 className="section-title">{t('shopByCategory')}</h2>
      <div className="cat-quick-grid">
        {categories.map((c) => (
          <button className="cat-quick-card" onClick={() => setCategoryView(c.id)} key={c.id}>
            <div className="cat-quick-icon">
              <CategoryVisual catId={c.id} size="28px" />
            </div>
            <div className="cat-quick-label">{lang === 'ar' ? c.ar : c.en}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
