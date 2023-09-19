import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import Text from 'components/Text';
import DeleteIcon from 'components/icons/DeleteIcon';
import MinusIcon from 'components/icons/MinusIcon';
import PlusIcon from 'components/icons/PlusIcon';
import { AppRoute } from 'config/app-route';
import ProductStore from 'store/ProductStore';
import rootStore from 'store/RootStore';
import { useLocalStore } from 'store/hooks/useLocalStore';
import styles from './CartItem.module.scss';

export type CartItemProps = {
  className?: string;
  productId: number;
};

const CartItem: React.FC<CartItemProps> = ({ className, productId }) => {
  const controlButtonsRef = React.useRef<HTMLDivElement | null>(null);

  const cartStore = rootStore.cart;
  const productStore = useLocalStore(() => new ProductStore());

  const navigate = useNavigate();

  React.useEffect(() => {
    productStore.getProduct(String(productId));
  }, [productId, productStore]);

  const handelItemClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    const isControlButtons = controlButtonsRef.current?.contains(event.target as HTMLElement);

    if (!isControlButtons) {
      navigate(generatePath(AppRoute.product, {id: `${productId}`}));
    }
  }, [navigate, productId]);

  return (
    <div className={cn(styles['cart-item'], className)} onClick={handelItemClick}>
      <div className={styles['cart-item__card']}>
        <div className={styles['cart-item__image']}>
          <img src={productStore.product.images[0]} width='120' height='120' alt='Product main image' />
        </div>

        <div className={styles['cart-item__description']}>
          <Text tag="h2" view="p-20" weight="medium" maxLines={2}>
            {productStore.product.title}
          </Text>

          <Text tag="p" view="p-16" color="secondary" maxLines={3}>
            {productStore.product.description}
          </Text>
        </div>
      </div>

      <div className={styles['cart-item__controls']} ref={controlButtonsRef}>
        <div className={styles['cart-item__count']}>
          <button
            className={styles['cart-item__button']}
            type="button"
            onClick={() => cartStore.minusItem(productId)}
          >
            <MinusIcon width={20} height={20} />
          </button>

          <Text tag="p" view="p-18" weight="bold">
            {cartStore.getItemCount(productId)}
          </Text>

          <button
            className={styles['cart-item__button']}
            type="button"
            onClick={() => cartStore.plusItem(productId)}
          >
            <PlusIcon width={20} height={20} />
          </button>
        </div>

        <Text className={styles['cart-item__price']} tag="p" view="p-20" weight="bold">
          {`$${productStore.product.price * cartStore.getItemCount(productId)}`}
        </Text>

        <button
          className={cn(styles['cart-item__button'], styles['cart-item__button--delete'])}
          type="button"
          onClick={() => cartStore.deleteItem(productId)}
        >
          <DeleteIcon width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default observer(CartItem);
