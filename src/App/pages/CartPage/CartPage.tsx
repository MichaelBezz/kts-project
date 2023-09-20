import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import GoBackButton from 'components/GoBackButton';
import Text from 'components/Text';
import { useCartStore } from 'store/RootStore/hooks';
import CartTable from './components/CartTable';
import styles from './CartPage.module.scss';

const CartPage: React.FC = () => {
  const cartStore = useCartStore();

  return (
    <div className={styles['cart-page']}>
      <div className={cn(styles['cart-page__wrapper'], 'container')}>
        <GoBackButton className={styles['cart-page__go-back']} />

        <div className={styles['cart-page__header']}>
          <Text tag="h1" view="title" color="primary">
            Cart
          </Text>

          <Text tag="p" view="p-20" weight="bold">
            {`Your bag contains ${cartStore.count} ${cartStore.count > 1 ? 'products' : 'product'}`}
          </Text>
        </div>

        <CartTable className={styles['cart-page__table']} />
      </div>
    </div>
  );
};

export default observer(CartPage);
