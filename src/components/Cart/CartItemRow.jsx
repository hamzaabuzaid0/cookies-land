import { useLanguage } from '../../i18n/LanguageContext';
import { useCart } from '../../context/CartContext';
import { productName } from '../../utils/productName';
import { CategoryVisual } from '../../utils/categoryVisual';
import { Ltr } from '../../utils/Ltr';

export function CartItemRow({ productId, product, qty }) {
  const { lang, t } = useLanguage();
  const { changeQty, removeItem } = useCart();

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
        <div className="cart-item-price"><Ltr>{product.price} {t('egp')}</Ltr> × {qty}</div>
        <button className="remove-link" onClick={() => removeItem(productId)}>{t('remove')}</button>
      </div>
      <div className="qty-row">
        <button className="qty-btn" onClick={() => changeQty(productId, -1)}>−</button>
        <span>{qty}</span>
        <button className="qty-btn" onClick={() => changeQty(productId, 1)}>+</button>
      </div>
    </div>
  );
}
