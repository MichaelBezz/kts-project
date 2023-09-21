import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import Text from 'components/Text';
import DeleteIcon from 'components/icons/DeleteIcon';
import MinusIcon from 'components/icons/MinusIcon';
import PlusIcon from 'components/icons/PlusIcon';
import { AppRoute } from 'config/app-route';
import ProductModel from 'entities/ProductModel';
import { useCartStore } from 'store/RootStore/hooks';
import styles from './CartItem.module.scss';

export type CartItemProps = {
  className?: string;
  product: ProductModel;
};

const CartItem: React.FC<CartItemProps> = ({ className, product }) => {
  const controlButtonsRef = React.useRef<HTMLDivElement | null>(null);

  const cartStore = useCartStore();

  const navigate = useNavigate();

  const handelItemClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    const isControlButtons = controlButtonsRef.current?.contains(event.target as HTMLElement);

    if (!isControlButtons) {
      navigate(generatePath(AppRoute.product, {id: `${product.id}`}));
    }
  }, [navigate, product.id]);

  return (
    <div className={cn(styles['cart-item'], className)} onClick={handelItemClick}>
      <div className={styles['cart-item__card']}>
        <div className={styles['cart-item__image']}>
          <img src={product.images[0]} width='120' height='120' alt='Product main image' />
        </div>

        <div className={styles['cart-item__description']}>
          <Text tag="h2" view="p-20" weight="medium" maxLines={2}>
            {product.title}
          </Text>

          <Text tag="p" view="p-16" color="secondary" maxLines={3}>
            {product.description}
          </Text>
        </div>
      </div>

      <div className={styles['cart-item__controls']} ref={controlButtonsRef}>
        <div className={styles['cart-item__count']}>
          <button
            className={styles['cart-item__button']}
            type="button"
            onClick={() => cartStore.minus(product)}
          >
            <MinusIcon width={20} height={20} />
          </button>

          <Text tag="p" view="p-18" weight="bold">
            {cartStore.getItemCount(product.id)}
          </Text>

          <button
            className={styles['cart-item__button']}
            type="button"
            onClick={() => cartStore.plus(product)}
          >
            <PlusIcon width={20} height={20} />
          </button>
        </div>

        <Text className={styles['cart-item__price']} tag="p" view="p-20" weight="bold">
          {`$${product.price * cartStore.getItemCount(product.id)}`}
        </Text>

        <button
          className={cn(styles['cart-item__button'], styles['cart-item__button--delete'])}
          type="button"
          onClick={() => cartStore.delete(product)}
        >
          <DeleteIcon width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default observer(CartItem);
