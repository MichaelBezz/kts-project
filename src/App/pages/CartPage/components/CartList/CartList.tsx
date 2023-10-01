import cn from 'classnames';
import { motion, Variants } from 'framer-motion';
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

const cartItemVariants: Variants = {
  hidden: {
    y: '110%',
    opacity: 0
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: custom * 0.1,
      duration: 0.4
    }
  }),
};

const CartList: React.FC<CartListProps> = ({ className }) => {
  const cartStore = useCartStore();

  if (cartStore.isLoading) {
    return (<CartLoader className={styles['cart-list']} cards={6} />);
  }

  return (
    <div className={cn(styles['cart-list'], className)}>
      {!cartStore.count && (
        <Message>Your cart is empty.</Message>
      )}

      {cartStore.items.map((item, index) => (
        <motion.div
          key={item.id}
          custom={index}
          variants={cartItemVariants}
          initial="hidden"
          animate="visible"
        >
          <CartItem product={item} />
        </motion.div>
      ))}
    </div>
  );
};

export default observer(CartList);
