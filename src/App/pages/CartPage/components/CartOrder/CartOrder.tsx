import cn from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import * as Yup from 'yup';
import Text from 'components/Text';
import Button from 'components/buttons/Button';
import { useCartStore } from 'store/RootStore/hooks';
import styles from './CartOrder.module.scss';

export type CartOrderProps = {
  className?: string;
};

const SignupSchema = Yup.object().shape({
  discount: Yup.string()
    .lowercase()
    .matches(/^[1-9][0-9]-lalasia/, 'Enter symbols, for example: 20-lalasia')
});

const CartOrder: React.FC<CartOrderProps> = ({ className }) => {
  const cartStore = useCartStore();

  const handleFormSubmit = React.useCallback((value: string) => {
    const discount = parseInt(value, 10);

    if (!Number.isNaN(discount)) {
      cartStore.setDiscount(discount);
    } else {
      cartStore.setDiscount(0);
    }
  }, [cartStore]);

  return (
    <div className={cn(styles['cart-order'], className)}>
      <div className={styles['cart-order__block']}>
        <div className={styles['cart-order__row']}>
          <Text tag="h2" view="p-24" weight="bold">Order</Text>
        </div>

        <div className={styles['cart-order__row']}>
          <Text tag="p" view="p-18" color="secondary">{`${cartStore.count > 1 ? 'Products' : 'Product'}:`}</Text>
          <Text tag="p" view="p-18" color="secondary">{cartStore.count} items</Text>
        </div>

        <div className={styles['cart-order__row']}>
          <Text tag="p" view="p-18" color="secondary">Discount:</Text>
          <Text tag="p" view="p-18" color={cartStore.discount < 1 ? 'secondary' : 'accent'}>
            {cartStore.discount}%
          </Text>
        </div>

        <div className={styles['cart-order__row']}>
          <Text tag="p" view="p-18" color="secondary">Delivery:</Text>
          <Text tag="p" view="p-18" color="accent">free</Text>
        </div>

        <div className={styles['cart-order__row']}>
          <Text tag="p" view="p-20" weight="bold">Total:</Text>
          <Text tag="p" view="p-20" weight="bold">${cartStore.totalPrice}</Text>
        </div>
      </div>

      <div className={styles['cart-order__block']}>
        <Text tag="h2" view="p-24" weight="bold">Do you have a lucky set of symbols?</Text>

        <Formik
          initialValues={{ discount: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            const { discount } = values;
            handleFormSubmit(discount);
          }}
        >
          {({ isValid }) => (
            <Form className={styles['cart-order__form']} noValidate>
              <div className={styles['cart-order__field']}>
                <label className="visually-hidden" htmlFor="c-discount">
                  <Text tag="p" view="p-20">Discount</Text>
                </label>

                <Field
                  className={styles['cart-order__input']}
                  id="c-discount"
                  type="text"
                  name="discount"
                  placeholder="20-lalasia"
                />

                <ErrorMessage name="discount">
                  {(msg) => (
                    <Text tag="p" view="p-14" color="error">{msg}</Text>
                  )}
                </ErrorMessage>
              </div>

              <Button
                className={styles['cart-order__button']}
                type="submit"
                disabled={!isValid}
              >
                Get discount
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default observer(CartOrder);
