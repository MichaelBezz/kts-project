import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Text from 'components/Text';
import Button from 'components/buttons/Button';
import MinusIcon from 'components/icons/MinusIcon';
import PlusIcon from 'components/icons/PlusIcon';
import ProductModel from 'models/ProductModel';
import { useCartStore } from 'store/RootStore/hooks';
import styles from './AddButton.module.scss';

export type AddButtonProps = {
  className?: string;
  product: ProductModel;
  style?: 'primary' | 'secondary';
};

const AddButton: React.FC<AddButtonProps> = ({ className, product, style = 'primary' }) => {
  const cartStore = useCartStore();
  const hasCart = cartStore.hasItem(product.id);

  const handlePlusButtonClick = React.useCallback((product: ProductModel) => {
    cartStore.plus(product);
  }, [cartStore]);

  const handleMinusButtonClick = React.useCallback((product: ProductModel) => {
    cartStore.minus(product);
  }, [cartStore]);

  return (
    <div className={cn(styles['add-button'], className)}>
      {hasCart ? (
        <div className={styles['add-button__controls']}>
          <button
            className={styles['add-button__button']}
            type="button"
            onClick={() => handleMinusButtonClick(product)}
          >
            <MinusIcon width={20} height={20} />
          </button>

          <Text className={styles['add-button__count']} tag="p" view="p-18" weight="bold">
            {cartStore.getItemCount(product.id)}
          </Text>

          <button
            className={styles['add-button__button']}
            type="button"
            onClick={() => handlePlusButtonClick(product)}
          >
            <PlusIcon width={20} height={20} />
          </button>
        </div>
      ) : (
        <Button
          buttonStyle={style}
          onClick={() => handlePlusButtonClick(product)}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default observer(AddButton);
