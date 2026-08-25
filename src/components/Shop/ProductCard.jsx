import { useLanguage } from '../../i18n/LanguageContext';
import { useCart } from '../../context/CartContext';
import { productName } from '../../utils/productName';
import { CategoryVisual } from '../../utils/categoryVisual';
import { Ltr } from '../../utils/Ltr';

export function ProductCard({ product }) {
  const { lang, t } = useLanguage();
  const { cart, changeQty } = useCart();
  const qty = cart[product.id] || 0;
  const name = productName(product, lang);

  return (
    <div className="product-card">
      <div className="product-icon">
        {product.image ? (
          <img src={product.image} alt={name} />
        ) : (
          <CategoryVisual catId={product.cat} size="38px" />
        )}
      </div>

      {!product.confirmed && <span className="stock-badge prelim-badge">{t('prelim')}</span>}
      {!product.image && <div className="photo-pending">{t('photoPending')}</div>}

      <div className="product-name">{name}</div>

      <div className="price-row">
        <span className="price"><Ltr>{product.price} {t('egp')}</Ltr></span>
      </div>
      <div className="price-note">{t('priceApprox')} — {t('priceNote')}</div>

      {qty > 0 ? (
        <div className="qty-row">
          <button className="qty-btn" onClick={() => changeQty(product.id, -1)}>−</button>
          <span>{qty}</span>
          <button className="qty-btn" onClick={() => changeQty(product.id, 1)}>+</button>
        </div>
      ) : (
        <button className="add-btn" onClick={() => changeQty(product.id, 1)}>{t('add')}</button>
      )}
    </div>
  );
}
