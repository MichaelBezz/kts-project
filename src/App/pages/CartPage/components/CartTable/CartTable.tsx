import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Message from 'components/Message';
import { useCartStore } from 'store/RootStore/hooks';
import CartItem from '../CartItem';
import styles from './CartTable.module.scss';

export type CartTableProps = {
  className?: string;
};

const CartTable: React.FC<CartTableProps> = ({ className }) => {
  const cartStore = useCartStore();

  return (
    <div className={cn(styles['cart-table'], className)}>
      {!cartStore.count && (
        <Message>Your cart is empty.</Message>
      )}

      {cartStore.items.map((id) => (
        <CartItem key={id} productId={id} />
      ))}
    </div>
  );
};

export default observer(CartTable);
