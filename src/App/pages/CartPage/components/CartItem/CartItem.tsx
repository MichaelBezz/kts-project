import cn from 'classnames';
import { motion, Variants } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { generatePath, Link } from 'react-router-dom';
import Text from 'components/Text';
import DeleteIcon from 'components/icons/DeleteIcon';
import MinusIcon from 'components/icons/MinusIcon';
import PlusIcon from 'components/icons/PlusIcon';
import { AppRoute } from 'config/app-route';
import ProductModel from 'models/ProductModel';
import { useCartStore } from 'store/RootStore/hooks';
import styles from './CartItem.module.scss';

export type CartItemProps = {
  className?: string;
  product: ProductModel;
};

const buttonVariants: Variants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

const CartItem: React.FC<CartItemProps> = ({ className, product }) => {
  const cartStore = useCartStore();

  return (
    <div className={cn(styles['cart-item'], className)}>
      <Link className={styles['cart-item__card']} to={generatePath(AppRoute.product, {id: `${product.id}`})}>
        <div className={styles['cart-item__image']}>
          <img src={product.images[0]} width="120" height="120" alt="Product main image" />
        </div>

        <div className={styles['cart-item__description']}>
          <Text tag="h2" view="p-20" weight="medium" maxLines={2}>
            {product.title}
          </Text>

          <Text tag="p" view="p-16" color="secondary" maxLines={3}>
            {product.description}
          </Text>
        </div>
      </Link>

      <div className={styles['cart-item__controls']}>
        <div className={styles['cart-item__count']}>
          <motion.button
            className={styles['cart-item__button']}
            type="button"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={cartStore.getItemCount(product.id) <= 1}
            onClick={() => cartStore.minus(product)}
          >
            <MinusIcon width={20} height={20} />
          </motion.button>

          <Text tag="p" view="p-18" weight="bold">
            {cartStore.getItemCount(product.id)}
          </Text>

          <motion.button
            className={styles['cart-item__button']}
            type="button"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => cartStore.plus(product)}
          >
            <PlusIcon width={20} height={20} />
          </motion.button>
        </div>

        <div className={styles['cart-item__price']}>
          {cartStore.discount > 0 ? (
            <>
              <Text className={styles['cart-item__full-price']} tag="p" view="p-14" color="secondary">
                ${product.price * cartStore.getItemCount(product.id)}
              </Text>
              <Text tag="p" view="p-20" weight="bold">
                ${product.discountPrice * cartStore.getItemCount(product.id)}
              </Text>
            </>
          ) : (
            <Text tag="p" view="p-20" weight="bold">
              ${product.price * cartStore.getItemCount(product.id)}
            </Text>
          )}
        </div>

        <motion.button
          className={cn(styles['cart-item__button'], styles['cart-item__button--delete'])}
          type="button"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => cartStore.delete(product)}
        >
          <DeleteIcon width={20} height={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default observer(CartItem);
