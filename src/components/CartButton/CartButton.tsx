import cn from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import CartIcon from 'components/icons/CartIcon';
import { AppRoute } from 'config/app-route';
import rootStore from 'store/RootStore';
import styles from './CartButton.module.scss';

export type CartButtonProps = {
  className?: string;
};

const CartButton: React.FC<CartButtonProps> = ({ className }) => {
  const cartStore = rootStore.cart;

  return (
    <Link
      className={cn(styles['cart-button'], className)}
      to={AppRoute.cart}
      aria-label="Cart"
    >
      <Text className={styles['cart-button__count']} tag="span" view="p-14">
        {cartStore.count}
      </Text>

      <CartIcon
        className={styles['cart-button__icon']}
        width={30}
        height={30}
      />
    </Link>
  );
};

export default CartButton;
