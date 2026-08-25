import { useLanguage } from '../../i18n/LanguageContext';
import { useCart } from '../../context/CartContext';
import { productName } from '../../utils/productName';
import { CategoryVisual } from '../../utils/categoryVisual';
import { Ltr } from '../../utils/Ltr';
import { unitStep, formatQty } from '../../utils/unitLabel';

export function CartItemRow({ productId, product, qty }) {
  const { lang, t } = useLanguage();
  const { changeQty, removeItem } = useCart();
  const step = unitStep(product);

  return (
    <div className="cart-item">
      <div className="cart-item-icon">
        {product.image ? (
          <img src={product.image} alt={productName(product, lang)} />
        ) : (
          <CategoryVisual catId={product.cat} size="22px" />
        )}
      </div>
      <div className="cart-item-info">
        <div className="cart-item-name">{productName(product, lang)}</div>
        <div className="cart-item-price"><Ltr>{product.price} {t('egp')}</Ltr> × {formatQty(qty, product, lang)}</div>
        <button className="remove-link" onClick={() => removeItem(productId)}>{t('remove')}</button>
      </div>
      <div className="qty-row">
        <button className="qty-btn" onClick={() => changeQty(productId, -step)}>−</button>
        <span><Ltr>{formatQty(qty, product, lang)}</Ltr></span>
        <button className="qty-btn" onClick={() => changeQty(productId, step)}>+</button>
      </div>
    </div>
  );
}
