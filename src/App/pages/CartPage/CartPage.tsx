import cn from 'classnames';
import * as React from 'react';
import GoBackButton from 'components/GoBackButton';
import Text from 'components/Text';
import CartTable from './components/CartTable';
import styles from './CartPage.module.scss';

const CartPage: React.FC = () => {
  return (
    <div className={styles['cart-page']}>
      <div className={cn(styles['cart-page__wrapper'], 'container')}>
        <GoBackButton className={styles['cart-page__go-back']} />

        <Text
          className={styles['cart-page__title']}
          tag="h1"
          view="title"
          color="primary"
        >
          Cart
        </Text>

        <CartTable className={styles['cart-page__table']} />
      </div>
    </div>
  );
};

export default CartPage;
