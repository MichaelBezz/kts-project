import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Message from 'components/Message';
import rootStore from 'store/RootStore';
import CartItem from '../CartItem';
import styles from './CartTable.module.scss';

export type CartTableProps = {
  className?: string;
};

const CartTable: React.FC<CartTableProps> = ({ className }) => {
  const cartStore = rootStore.cart;

  return (
    <div className={cn(styles['cart-table'], className)}>
      {!cartStore.count && (
        <Message>Cart is empty.</Message>
      )}

      <CartItem productId={0} />
      <CartItem productId={0} />
      <CartItem productId={0} />
      <CartItem productId={0} />
    </div>
  );
};

export default observer(CartTable);