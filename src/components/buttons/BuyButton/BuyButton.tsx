import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/buttons/Button';
import { AppRoute } from 'config/app-route';
import ProductModel from 'models/ProductModel';
import { useCartStore } from 'store/RootStore/hooks';

export type BuyButtonProps = {
  className?: string;
  product: ProductModel;
};

const BuyButton: React.FC<BuyButtonProps> = ({ className, product }) => {
  const navigate = useNavigate();

  const cartStore = useCartStore();
  const hasCart = cartStore.hasItem(product.id);

  const handleButtonClick = React.useCallback((product: ProductModel) => {
    if (!hasCart) {
      cartStore.plus(product);
    }

    navigate(AppRoute.cart);
  }, [cartStore, hasCart, navigate]);

  return (
    <Button
      className={className}
      buttonStyle="primary"
      onClick={() => handleButtonClick(product)}
    >
      Buy Now
    </Button>
  );
};

export default observer(BuyButton);
