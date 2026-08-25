import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useDrawer } from '../../context/DrawerContext';
import { products } from '../../data/products';
import { business } from '../../data/business';
import { buildWhatsappMessage } from '../../utils/buildWhatsappMessage';
import { useFulfillmentForm } from '../../utils/useFulfillmentForm';
import { FulfillmentFields } from '../FulfillmentFields';
import { Ltr } from '../../utils/Ltr';
import { CartItemRow } from './CartItemRow';

export function CartDrawer() {
  const { t } = useLanguage();
  const { cart, itemsTotal, itemCount } = useCart();
  const { cartOpen, closeCart } = useDrawer();
  const form = useFulfillmentForm();
  const [error, setError] = useState('');

  const ids = Object.keys(cart);
  const deliveryFee = form.mode === 'delivery' ? business.deliveryFee : 0;
  const grandTotal = itemsTotal + deliveryFee;

  const handleOrder = () => {
    if (!form.isValid()) {
      setError(t('fillRequiredFields'));
      return;
    }
    setError('');
    const { text, phone } = buildWhatsappMessage({
      cart,
      products,
      fulfillment: form,
      deliveryFee: business.deliveryFee,
      whatsapp: business.whatsapp,
    });
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={'cart-drawer' + (cartOpen ? ' show' : '')}>
      <div className="cart-header">
        <h3>{t('yourCart')}</h3>
        <button className="close-btn" onClick={closeCart}>×</button>
      </div>

      <div className="cart-items">
        {ids.length === 0 ? (
          <div className="cart-empty">🛒<br /><br />{t('cartEmpty')}</div>
        ) : (
          ids.map((id) => {
            const product = products.find((p) => p.id === id);
            return <CartItemRow key={id} productId={id} product={product} qty={cart[id]} />;
          })
        )}
      </div>

      {ids.length > 0 && (
        <div className="cart-footer">
          <div className="total-row" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--muted)', marginBottom: 4 }}>
            <span>{t('subtotal')}</span>
            <span><Ltr>{itemsTotal} {t('egp')}</Ltr></span>
          </div>
          {form.mode === 'delivery' && (
            <div className="total-row" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--muted)', marginBottom: 4 }}>
              <span>{t('deliveryFeeLabel')}</span>
              <span><Ltr>{deliveryFee} {t('egp')}</Ltr></span>
            </div>
          )}
          <div className="total-row">
            <span>{t('total')}</span>
            <span><Ltr>{grandTotal} {t('egp')}</Ltr></span>
          </div>

          <FulfillmentFields form={form} />
          {error && <div className="form-error">{error}</div>}

          <button className="wa-order-btn" onClick={handleOrder}>
            <span>📲</span>
            <span>{t('orderViaWhatsapp')}</span>
          </button>
        </div>
      )}
    </div>
  );
}
