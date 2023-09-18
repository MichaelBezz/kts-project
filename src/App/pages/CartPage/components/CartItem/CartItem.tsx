import cn from 'classnames';
import * as React from 'react';
import Text from 'components/Text';
import DeleteIcon from 'components/icons/DeleteIcon';
import MinusIcon from 'components/icons/MinusIcon';
import PlusIcon from 'components/icons/PlusIcon';
import ProductStore from 'store/ProductStore';
import { useLocalStore } from 'store/hooks/useLocalStore';
import styles from './CartItem.module.scss';

export type CartItemProps = {
  className?: string;
  productId: number;
};

const CartItem: React.FC<CartItemProps> = ({ className, productId }) => {
  const productStore = useLocalStore(() => new ProductStore());

  React.useEffect(() => {
    productStore.getProduct(String(1));
  }, [productId, productStore]);

  return (
    <div className={cn(styles['cart-item'], className)}>
      <div className={styles['cart-item__card']}>
        <div className={styles['cart-item__image']}>
          <img src={'https://placehold.co/120x120/orange/white'} width='120' height='120' alt='Product main image' />
        </div>

        <div className={styles['cart-item__description']}>
          <Text tag="h2" view="p-20" weight="medium" maxLines={2}>
            Title
          </Text>

          <Text tag="p" view="p-16" color="secondary" maxLines={3}>
            Description
          </Text>
        </div>
      </div>

      <div className={styles['cart-item__controls']}>
        <div className={styles['cart-item__count']}>
          <button
            className={styles['cart-item__button']}
            type="button"
          >
            <MinusIcon width={20} height={20} />
          </button>

          <Text tag="p" view="p-18" weight="bold">
            000
          </Text>

          <button
            className={styles['cart-item__button']}
            type="button"
          >
            <PlusIcon width={20} height={20} />
          </button>
        </div>

        <Text className={styles['cart-item__price']} tag="p" view="p-18" weight="bold">
          $10000
        </Text>

        <button
          className={cn(styles['cart-item__button'], styles['cart-item__button--delete'])}
          type="button"
        >
          <DeleteIcon width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
