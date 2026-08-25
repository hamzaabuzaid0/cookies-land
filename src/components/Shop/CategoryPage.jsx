import { useLanguage } from '../../i18n/LanguageContext';
import { useDrawer } from '../../context/DrawerContext';
import { categories } from '../../data/categories';
import { ShopSections } from './ShopSections';

// Clicking a category on the home grid lands here — just that category's
// items, not a scroll down a long page.
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
      <ShopSections filterCategory={catId} />
    </div>
  );
}
