import { useLanguage } from '../../i18n/LanguageContext';
import { useCart } from '../../context/CartContext';
import { productName } from '../../utils/productName';
import { CategoryVisual } from '../../utils/categoryVisual';
import { Ltr } from '../../utils/Ltr';
import { unitStep, formatQty } from '../../utils/unitLabel';

// The dedicated per-item view: click a product card anywhere to open this,
// pick the quantity in its real unit (tray/kg/tub), confirm. Replaces
// picking quantity directly on the card.
export function ProductDetailModal({ product, onClose }) {
  const { lang, t } = useLanguage();
  const { cart, changeQty } = useCart();

  if (!product) return null;

  const qty = cart[product.id] || 0;
  const name = productName(product, lang);
  const step = unitStep(product);

  const startAdding = () => changeQty(product.id, 1);

  return (
    <div className="overlay show" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close-btn product-detail-close" onClick={onClose}>×</button>

        <div className="product-detail-icon">
          {product.image ? (
            <img src={product.image} alt={name} />
          ) : (
            <CategoryVisual catId={product.cat} size="64px" />
          )}
        </div>

        {!product.confirmed && <span className="stock-badge prelim-badge">{t('prelim')}</span>}
        {!product.image && <div className="photo-pending">{t('photoPending')}</div>}

        <h3 className="product-detail-name">{name}</h3>
        <div className="price"><Ltr>{product.price} {t('egp')}</Ltr></div>
        <div className="price-note">{t('priceApprox')} — {t('priceNote')}</div>

        <div className="product-detail-qty">
          <label className="form-label">{t('quantityLabel')}</label>
          {qty > 0 ? (
            <div className="qty-row" style={{ justifyContent: 'center' }}>
              <button className="qty-btn" onClick={() => changeQty(product.id, -step)}>−</button>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, minWidth: 90, textAlign: 'center' }}>
                <Ltr>{formatQty(qty, product, lang)}</Ltr>
              </span>
              <button className="qty-btn" onClick={() => changeQty(product.id, step)}>+</button>
            </div>
          ) : (
            <button className="add-btn" style={{ width: '100%' }} onClick={startAdding}>{t('add')}</button>
          )}
        </div>

        <button type="button" className="wa-order-btn" style={{ background: 'var(--maroon)' }} onClick={onClose}>
          {qty > 0 ? t('doneBtn') : t('backToOrder')}
        </button>
      </div>
    </div>
  );
}
