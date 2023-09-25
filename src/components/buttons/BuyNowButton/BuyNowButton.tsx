import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/buttons/Button';
import { AppRoute } from 'config/app-route';
import ProductModel from 'models/ProductModel';
import { useCartStore } from 'store/RootStore/hooks';

export type BuyNowButtonProps = {
  className?: string;
  product: ProductModel;
};

const BuyNowButton: React.FC<BuyNowButtonProps> = ({ className, product }) => {
  const navigate = useNavigate();

  const cartStore = useCartStore();
  const hasCart = cartStore.hasItem(product.id);

  const handelButtonClick = (product: ProductModel) => {
    if (!hasCart) {
      cartStore.plus(product);
    }

    navigate(AppRoute.cart);
  };

  return (
    <Button
      className={className}
      buttonStyle="primary"
      onClick={() => handelButtonClick(product)}
    >
      Buy Now
    </Button>
  );
};

export default observer(BuyNowButton);
