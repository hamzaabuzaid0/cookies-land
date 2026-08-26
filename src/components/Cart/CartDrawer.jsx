import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useDrawer } from '../../context/DrawerContext';
import { useCatalog } from '../../context/CatalogContext';
import { business } from '../../data/business';
import { useFulfillmentForm } from '../../utils/useFulfillmentForm';
import { useTicketCheckout } from '../../utils/useTicketCheckout';
import { productName } from '../../utils/productName';
import { FulfillmentFields } from '../FulfillmentFields';
import { DepositStep } from '../Checkout/DepositStep';
import { TicketSuccess } from '../Checkout/TicketSuccess';
import { Ltr } from '../../utils/Ltr';
import { CartItemRow } from './CartItemRow';

export function CartDrawer() {
  const { t } = useLanguage();
  const { products } = useCatalog();
  const { cart, itemsTotal, clearCart } = useCart();
  const { cartOpen, closeCart } = useDrawer();
  const form = useFulfillmentForm();
  const checkout = useTicketCheckout();
  const [formError, setFormError] = useState('');

  const ids = Object.keys(cart);
  const deliveryFee = form.mode === 'delivery' ? business.deliveryFee : 0;
  const grandTotal = itemsTotal + deliveryFee;

  const handleContinue = () => {
    if (!form.isValid()) {
      setFormError(t('fillRequiredFields'));
      return;
    }
    setFormError('');
    checkout.goToDeposit();
  };

  const handleSubmit = () => {
    checkout.submit({
      source: 'cart',
      items: ids.map((id) => {
        const p = products.find((pp) => pp.id === id);
        return { id, ar: p.ar, en: p.en, unit: p.unit || null, qty: cart[id], price: p.price };
      }),
      fulfillment: {
        mode: form.mode, name: form.name, phone: form.phone, address: form.address, notes: form.notes,
      },
      subtotal: itemsTotal,
      deliveryFee,
      total: grandTotal,
      depositAmount: business.depositAmount,
    });
  };

  const handleReset = () => {
    clearCart();
    checkout.reset();
    closeCart();
  };

  return (
    <div className={'cart-drawer' + (cartOpen ? ' show' : '')}>
      <div className="cart-header">
        <h3>{t('yourCart')}</h3>
        <button className="close-btn" onClick={closeCart}>×</button>
      </div>

      {checkout.phase === 'success' ? (
        <div className="cart-items">
          <TicketSuccess ticketId={checkout.ticketId} onReset={handleReset} />
        </div>
      ) : (
        <>
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

              {checkout.phase === 'form' ? (
                <>
                  <FulfillmentFields form={form} />
                  {formError && <div className="form-error">{formError}</div>}
                  <button className="wa-order-btn" onClick={handleContinue}>
                    <span>{t('continueToDeposit')}</span>
                  </button>
                </>
              ) : (
                <DepositStep checkout={checkout} onSubmit={handleSubmit} onBack={checkout.backToForm} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
