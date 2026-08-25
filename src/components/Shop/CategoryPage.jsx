import { useLanguage } from '../../i18n/LanguageContext';
import { useDrawer } from '../../context/DrawerContext';
import { categories } from '../../data/categories';
import { CategoryVisual } from '../../utils/categoryVisual';
import { ShopSections } from './ShopSections';

// Clicking a category on the home grid lands here — just that category's
// items, not a scroll down a long page. The category switcher stays visible
// so you can jump straight to another category without going back first.
export function CategoryPage({ catId }) {
  const { lang, t } = useLanguage();
  const { setCategoryView } = useDrawer();
  const cat = categories.find((c) => c.id === catId);

  return (
    <div className="category-page">
      <div className="category-page-header">
        <button className="nav-link" onClick={() => setCategoryView(null)}>{t('backToAllCategories')}</button>
        <h1>{cat ? (lang === 'ar' ? cat.ar : cat.en) : ''}</h1>
      </div>
      <div className="cat-quick-grid category-switcher">
        {categories.map((c) => (
          <button
            className={'cat-quick-card' + (c.id === catId ? ' active' : '')}
            onClick={() => setCategoryView(c.id)}
            key={c.id}
          >
            <div className="cat-quick-icon">
              <CategoryVisual catId={c.id} size="28px" />
            </div>
            <div className="cat-quick-label">{lang === 'ar' ? c.ar : c.en}</div>
          </button>
        ))}
      </div>
      <ShopSections filterCategory={catId} />
    </div>
  );
}
