import cn from 'classnames';
import * as React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import { APIRoute } from 'config/api-route';
import { AppRoute } from 'config/app-route';
import { api } from 'services/api';
import { TProduct } from 'types/product';
import styles from './RelatedCards.module.scss';

export type RelatedCardsProps = {
  className?: string;
  product: TProduct;
};

const RelatedCards: React.FC<RelatedCardsProps> = ({ className, product }) => {
  const [products, setProducts] = React.useState<TProduct[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    const getData = async (id: number) => {
      const { data } = await api.get<TProduct[]>(`${APIRoute.Categories}/${id}${APIRoute.Products}`);
      setProducts(data);
    };

    getData(product.category.id);
  }, [product]);

  return (
    <div className={cn(styles['related-cards'], className)}>
      <Text tag="h2" view='p-32'>
        Related Items
      </Text>

      <ul className={styles['related-cards__list']}>
        {products.slice(0, 3).map((product) => (
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
    </div>
  );
};

export default RelatedCards;
