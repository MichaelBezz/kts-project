import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate, generatePath, useSearchParams } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import CardLoader from 'components/CardLoader';
import Loader from 'components/Loader';
import Notification from 'components/Notification';
import Pagination from 'components/Pagination';
import Text from 'components/Text';
import { AppRoute } from 'config/app-route';
import ProductsStore from 'store/ProductsStore';
import { useLocalStore } from 'store/hooks/useLocalStore';
import styles from './ProductList.module.scss';

export type ProductListProps = {
  className?: string;
};

const ProductList: React.FC<ProductListProps> = ({ className }) => {
  const productsStore = useLocalStore(() => new ProductsStore());

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    productsStore.getProducts();
  }, [productsStore]);

  const handelPaginationChange = React.useCallback((page: number) => {
    searchParams.set('page', `${page}`);
    setSearchParams(searchParams);

    productsStore.setCurrentPage(page);
  }, [searchParams, setSearchParams, productsStore]);

  return (
    <div className={cn(styles['product-list'], className)}>
      <div className={styles['product-list__header']}>
        <Text tag="h2" view="p-32">Total Product</Text>

        {productsStore.isLoading ? (
          <Loader size="s" />
        ) : (
          <Text tag="p" view="p-20" weight="bold" color="accent">
            {productsStore.productCount}
          </Text>
        )}
      </div>

      {(productsStore.isSuccess && !productsStore.products.length) && (
        <Notification>Product not found. Try again.</Notification>
      )}

      {productsStore.isError  && (
        <Notification>Error. Try again.</Notification>
      )}

      {productsStore.isLoading ? (
        <CardLoader className={styles['product-list__body']} cards={productsStore.productLimit}/>
      ) : (
        <ul className={styles['product-list__body']}>
          {productsStore.products.map((product) => (
            <li key={product.id}>
              <Card
                image={product.images[0]}
                captionSlot={product.category.name}
                title={product.title}
                subtitle={product.description}
                contentSlot={`$${product.price}`}
                onClick={() => navigate(
                  generatePath(AppRoute.product, {id: `${product.id}`})
                )}
                actionSlot={<Button buttonStyle="primary">Add to Cart</Button>}
              />
            </li>
          ))}
        </ul>
      )}

      <Pagination
        className={styles['product-list__pagination']}
        currentPage={productsStore.currentPage}
        totalCount={productsStore.productCount ?? 0}
        pageSize={productsStore.productLimit}
        onPageChange={handelPaginationChange}
      />
    </div>
  );
};

export default observer(ProductList);
