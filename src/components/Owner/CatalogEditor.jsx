import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useCatalog } from '../../context/CatalogContext';
import { categories } from '../../data/categories';
import { productName } from '../../utils/productName';
import { saveOverride } from '../../utils/catalogOverridesRepo';
import { compressImageToDataUrl } from '../../utils/compressImage';
import { Ltr } from '../../utils/Ltr';

function CatalogRow({ product }) {
  const { lang, t } = useLanguage();
  const [price, setPrice] = useState(product.price);
  const [available, setAvailable] = useState(product.available !== false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async (extra = {}) => {
    setSaving(true);
    setSaved(false);
    try {
      await saveOverride(product.id, { price: Number(price), available, ...extra });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const onPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageDataUrl = await compressImageToDataUrl(file, { maxDimension: 700, maxBytes: 400000 });
    await save({ imageDataUrl });
  };

  return (
    <div className="catalog-row">
      <div className="catalog-row-photo">
        {product.image ? <img src={product.image} alt="" /> : <span className="photo-pending">{t('photoPending')}</span>}
        <label className="catalog-photo-upload">
          {t('uploadPhotoLabel')}
          <input type="file" accept="image/*" onChange={onPhoto} hidden />
        </label>
      </div>
      <div className="catalog-row-info">
        <div className="catalog-row-name">{productName(product, lang)}</div>
        <div className="catalog-row-controls">
          <label>
            {t('priceLabel')}
            <input
              className="form-input catalog-price-input"
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Ltr>{t('egp')}</Ltr>
          </label>
          <label className="catalog-available-toggle">
            <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
            {t('availableLabel')}
          </label>
          <button type="button" className="fulfillment-btn active" disabled={saving} onClick={() => save()}>
            {saving ? t('submitting') : saved ? t('savedLabel') : t('saveLabel')}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CatalogEditor() {
  const { lang, t } = useLanguage();
  const { products } = useCatalog();

  return (
    <div className="catalog-editor">
      {categories.map((cat) => {
        const items = products.filter((p) => p.cat === cat.id);
        if (items.length === 0) return null;
        return (
          <div key={cat.id}>
            <h2 className="section-title">{lang === 'ar' ? cat.ar : cat.en}</h2>
            {items.map((p) => <CatalogRow key={p.id} product={p} />)}
          </div>
        );
      })}
    </div>
  );
}
