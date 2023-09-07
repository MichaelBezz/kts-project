import cn from 'classnames';
import * as React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import { AppRoute } from 'config/app-route';
import { TProducts } from 'types/product';
import Pagination from '../Pagination';
import styles from './ProductList.module.scss';

export type ProductListProps = {
  className?: string;
  products: TProducts;
};

const ProductList: React.FC<ProductListProps> = ({ className, products }) => {
  const navigate = useNavigate();

  return (
    <section className={cn(styles['product-list'], className)}>
      <div className="container">
        <div className={styles['product-list__header']}>
          <Text tag="h2" view="p-32">
            Total Product
          </Text>

          <Text tag="p" view="p-20" weight="bold" color="accent">
            {products.length}
          </Text>
        </div>

        <ul className={styles['product-list__body']}>
          {products.slice(0, 9).map((product) => (
            <li key={product.id} className={styles['product-list__item']}>
              <Card
                image={product.images[0]}
                captionSlot={product.category.name}
                title={product.title}
                subtitle={product.description}
                contentSlot={`$${product.price}`}
                onClick={() => navigate(generatePath(AppRoute.Product, {id: `${product.id}`}))}
                actionSlot={<Button>Add to Cart</Button>}
              />
            </li>
          ))}
        </ul>

        <Pagination className={styles['product-list__pagination']} />
      </div>
    </section>
  );
};

export default ProductList;
