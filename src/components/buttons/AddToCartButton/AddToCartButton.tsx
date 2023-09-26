import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Button from 'components/buttons/Button';
import ProductModel from 'models/ProductModel';
import { useCartStore } from 'store/RootStore/hooks';

export type AddToCartButtonProps = {
  className?: string;
  product: ProductModel;
  singleStyle?: boolean;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ className, product, singleStyle = false }) => {
  const cartStore = useCartStore();
  const hasCart = cartStore.hasItem(product.id);

  const handleButtonClick = React.useCallback((product: ProductModel) => {
    cartStore[hasCart ? 'delete' : 'plus'](product);
  }, [cartStore, hasCart]);

  return (
    <Button
      className={className}
      buttonStyle={hasCart || singleStyle ? 'secondary' : 'primary'}
      onClick={() => handleButtonClick(product)}
    >
      {hasCart
        ? `Remove (${cartStore.getItemCount(product.id)})`
        : 'Add to Cart'
      }
    </Button>
  );
};

export default observer(AddToCartButton);
