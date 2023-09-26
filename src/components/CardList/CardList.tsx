import cn from 'classnames';
import * as React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Card from 'components/Card';
import AddButton from 'components/buttons/AddButton';
import CardLoader from 'components/loaders/CardLoader';
import { AppRoute } from 'config/app-route';
import ProductModel from 'models/ProductModel';
import styles from './CardList.module.scss';

export type CardListProps = {
  className?: string;
  products: ProductModel[];
  productLimit: number;
  isLoading: boolean;
};

const CardList: React.FC<CardListProps> = ({ className, products, productLimit, isLoading }) => {
  const navigate = useNavigate();

  const handleCardClick = React.useCallback((
    event: React.MouseEvent<Element>,
    id: string
  ) => {
    event.preventDefault();

    const target = event.target as HTMLElement;
    if (!target.closest('button')) {
      navigate(generatePath(AppRoute.product, {id}));
    }
  }, [navigate]);

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
                onClick={(event) => handleCardClick(event, String(product.id))}
                actionSlot={(<AddButton product={product} />)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(CardList);
