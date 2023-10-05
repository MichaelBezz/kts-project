import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Text from 'components/Text';
import { useCartStore } from 'store/RootStore/hooks';
import CartAside from './components/CartAside';
import CartList from './components/CartList';
import styles from './CartPage.module.scss';

const CartPage: React.FC = () => {
  const cartStore = useCartStore();

  return (
    <div className={styles['cart-page']}>
      <div className={cn(styles['cart-page__wrapper'], 'container')}>
        <div className={styles['cart-page__header']}>
          <Text tag="h1" view="title" color="primary">
            Cart
          </Text>

          <Text tag="p" view="p-20" weight="bold">
            {`Your cart contains ${cartStore.count} ${cartStore.count > 1 ? 'products' : 'product'}:`}
          </Text>
        </div>

        <div className={styles['cart-page__body']}>
          <CartList className={styles['cart-page__list']} />
          {!!cartStore.count && (
            <CartAside className={styles['cart-page__order']} />
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(CartPage);
