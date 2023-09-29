import cn from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Text from 'components/Text';
import Button from 'components/buttons/Button';
import { AppRoute } from 'config/app-route';
import { useAuthStore, useCartStore } from 'store/RootStore/hooks';
import styles from './CartAside.module.scss';

export type CartOrderProps = {
  className?: string;
};

const SignupSchema = Yup.object().shape({
  discount: Yup.string()
    .lowercase()
    .matches(/^[1-9][0-9]-lalasia/, 'Promo code not found')
});

const CartAside: React.FC<CartOrderProps> = ({ className }) => {
  const authStore = useAuthStore();
  const cartStore = useCartStore();

  const navigate = useNavigate();
  const isAuth = authStore.isAuth;

  const handleOrderButtonClick = React.useCallback(() => {
    if (isAuth) {
      cartStore.setOrders();
      cartStore.clearData();

      navigate(AppRoute.user);
    } else {
      navigate(AppRoute.login);
    }
  }, [cartStore, isAuth, navigate]);

  const handleClearButtonClick = React.useCallback(() => {
    cartStore.clearData();
  }, [cartStore]);

  const handleFormSubmit = React.useCallback((discount: string) => {
    cartStore.setDiscount(discount);
  }, [cartStore]);

  return (
    <div className={cn(styles['cart-aside'], className)}>
      <div className={styles['cart-aside__block']}>
        <div className={styles['cart-aside__title']}>
          <Text tag="h2" view="p-24" weight="bold">Order</Text>
        </div>

        <div className={styles['cart-aside__row']}>
          <Text tag="p" view="p-18" color="secondary">
            {`${cartStore.count > 1 ? 'Products' : 'Product'}:`}
          </Text>
          <Text tag="p" view="p-18" color="secondary">
            {cartStore.count} {`${cartStore.count > 1 ? 'items' : 'item'}`}
          </Text>
        </div>

        <div className={styles['cart-aside__row']}>
          <Text tag="p" view="p-18" color="secondary">Discount:</Text>
          <Text tag="p" view="p-18" color={cartStore.discount < 1 ? 'secondary' : 'accent'}>
            {cartStore.discount}%
          </Text>
        </div>

        <div className={styles['cart-aside__row']}>
          <Text tag="p" view="p-18" color="secondary">Delivery:</Text>
          <Text tag="p" view="p-18" color={cartStore.delivery > 0 ? 'secondary' : 'accent'}>
            {cartStore.delivery > 0 ? `$${cartStore.delivery}` : 'free'}
          </Text>
        </div>

        <div className={styles['cart-aside__total']}>
          <div className={styles['cart-aside__row']}>
            <Text tag="p" view="p-14">Subtotal:</Text>
            <Text tag="p" view="p-14">${cartStore.totalPrice + cartStore.delivery}</Text>
          </div>

          <div className={styles['cart-aside__row']}>
            <Text tag="p" view="p-14" color={cartStore.discount > 0 ? 'error' : 'secondary'}>
              Discount:
            </Text>
            <Text tag="p" view="p-14" color={cartStore.discount > 0 ? 'error' : 'secondary'}>
              {cartStore.totalDiscountPrice === 0
                ? `$${cartStore.totalDiscountPrice}`
                : `$${cartStore.totalPrice - cartStore.totalDiscountPrice}`
              }
            </Text>
          </div>

          <div className={styles['cart-aside__row']}>
            <Text tag="p" view="p-20" weight="bold">Total:</Text>
            <Text tag="p" view="p-20" weight="bold">
              {cartStore.totalDiscountPrice === 0
                ? `$${cartStore.totalPrice + cartStore.delivery}`
                : `$${cartStore.totalDiscountPrice + cartStore.delivery}`
              }
            </Text>
          </div>
        </div>
      </div>

      <div className={styles['cart-aside__block']}>
        <Text tag="h2" view="p-24" weight="bold">Do you have a lucky set of symbols?</Text>

        <Formik
          initialValues={{ discount: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            handleFormSubmit(values.discount);
          }}
        >
          {({ isValid }) => (
            <Form className={styles['cart-aside__form']} noValidate>
              <div className={styles['cart-aside__field']}>
                <label className="visually-hidden" htmlFor="c-discount">
                  <Text tag="p" view="p-20">Discount</Text>
                </label>

                <Field
                  className={styles['cart-aside__input']}
                  id="c-discount"
                  type="text"
                  name="discount"
                  placeholder="promo-code"
                />

                <ErrorMessage name="discount">
                  {(msg) => (
                    <Text tag="p" view="p-14" color="error">{msg}</Text>
                  )}
                </ErrorMessage>
              </div>

              <Button
                className={styles['cart-aside__button']}
                type="submit"
                disabled={!isValid}
              >
                Get discount
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <Button buttonStyle="primary" onClick={handleOrderButtonClick}>
        Get order
      </Button>

      <Button buttonStyle="secondary" onClick={handleClearButtonClick}>
        Clear cart
      </Button>
    </div>
  );
};

export default observer(CartAside);
