import { useLanguage } from '../../i18n/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { productName } from '../../utils/productName';
import { CategoryVisual } from '../../utils/categoryVisual';
import { Ltr } from '../../utils/Ltr';
import { formatQty } from '../../utils/unitLabel';

// Clicking anywhere on the card opens ProductDetailModal, where quantity
// (in the item's real unit — tray/kg/tub) is actually chosen. The admin
// account browses the catalog read-only — no ordering controls for it.
export function ProductCard({ product, onOpen }) {
  const { lang, t } = useLanguage();
  const { cart } = useCart();
  const { isAdmin } = useAuth();
  const qty = cart[product.id] || 0;
  const name = productName(product, lang);

  return (
    <div
      className={'product-card' + (isAdmin ? ' product-card-readonly' : '')}
      onClick={isAdmin ? undefined : () => onOpen(product)}
      role={isAdmin ? undefined : 'button'}
      tabIndex={isAdmin ? undefined : 0}
    >
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

      {isAdmin ? null : qty > 0 ? (
        <div className="in-cart-pill"><Ltr>{formatQty(qty, product, lang)}</Ltr> {t('inCartLabel')}</div>
      ) : (
        <button className="add-btn" onClick={(e) => { e.stopPropagation(); onOpen(product); }}>{t('add')}</button>
      )}
    </div>
  );
}
