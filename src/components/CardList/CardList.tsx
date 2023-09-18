import cn from 'classnames';
import * as React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import CardLoader from 'components/CardLoader';
import { AppRoute } from 'config/app-route';
import rootStore from 'store/RootStore';
import { ProductModel } from 'store/models/product';
import styles from './CardList.module.scss';

export type CardListProps = {
  className?: string;
  products: ProductModel[];
  productLimit: number;
  isLoading: boolean;
};

const CardList: React.FC<CardListProps> = ({ className, products, productLimit, isLoading }) => {
  const cartStore = rootStore.cart;

  const navigate = useNavigate();

  const handelCardClick = (
    event: React.MouseEvent<Element>,
    id: string
  ) => {
    event.preventDefault();

    const target = event.target as HTMLElement;
    if (!target.closest('button')) {
      navigate(generatePath(AppRoute.product, {id}));
    }
  };

  return (
    <div className={cn(styles['card-list'], className)}>
      {isLoading ? (
        <CardLoader className={styles['card-list__grid']} cards={productLimit} />
      ) : (
        <ul className={styles['card-list__grid']}>
          {products.map((product) => (
            <li key={product.id}>
              <Card
                image={product.images[0]}
                captionSlot={product.category.name}
                title={product.title}
                subtitle={product.description}
                contentSlot={`$${product.price}`}
                onClick={(event) => handelCardClick(event, String(product.id))}
                actionSlot={(
                  <Button
                    buttonStyle="primary"
                    onClick={() => cartStore.plusItem(product.id)}
                  >
                    Add to Cart
                  </Button>
                )}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(CardList);
