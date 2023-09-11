import cn from 'classnames';
import * as React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import CardLoader from 'components/CardLoader';
import Text from 'components/Text';
import { AppRoute } from 'config/app-route';
import { TProduct } from 'types/product';
import styles from './CardList.module.scss';

export type CardListProps = {
  className?: string;
  title: string;
  products: TProduct[];
  productCount?: number;
  isLoading?: boolean;
  loaderCount?: number;
};

const CardList: React.FC<CardListProps> = ({ className, title, products, productCount, isLoading, loaderCount }) => {
  const navigate = useNavigate();

  return (
    <section className={cn(styles['card-list'], className)}>
      <div className={styles['card-list__header']}>
        <Text tag="h2" view="p-32">
          {title}
        </Text>

        {productCount && (
          <Text tag="p" view="p-20" weight="bold" color="accent">
            {productCount}
          </Text>
        )}
      </div>

      {isLoading ? (
        <CardLoader
          className={styles['card-list__body']}
          cards={loaderCount}
        />
      ) : (
        <ul className={styles['card-list__body']}>
          {products.map((product) => (
            <li key={product.id}>
              <Card
                image={product.images[0]}
                captionSlot={product.category.name}
                title={product.title}
                subtitle={product.description}
                contentSlot={`$${product.price}`}
                onClick={() => navigate(generatePath(AppRoute.Product, {id: `${product.id}`}))}
                actionSlot={<Button buttonStyle="primary">Add to Cart</Button>}
              />
            </li>
          ))}
        </ul>
      )}

    </section>
  );
};

export default CardList;