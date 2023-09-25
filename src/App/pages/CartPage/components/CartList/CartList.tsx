import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Message from 'components/Message';
import CartLoader from 'components/loaders/CartLoader';
import { useCartStore } from 'store/RootStore/hooks';
import CartItem from '../CartItem';
import styles from './CartList.module.scss';

export type CartListProps = {
  className?: string;
};

const CartList: React.FC<CartListProps> = ({ className }) => {
  const cartStore = useCartStore();

  if (cartStore.isLoading) {
    return (<CartLoader className={styles['cart-list']} />);
  }

  return (
    <div className={cn(styles['cart-list'], className)}>
      {!cartStore.count && (
        <Message>Your cart is empty.</Message>
      )}

      {cartStore.items.map((item) => (
        <CartItem key={item.id} product={item} />
      ))}
    </div>
  );
};

export default observer(CartList);
