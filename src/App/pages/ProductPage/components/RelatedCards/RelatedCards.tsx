import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import CardList from 'components/CardList';
import Text from 'components/Text';
import ProductsStore from 'store/ProductsStore';
import { useLocalStore } from 'store/hooks/useLocalStore';
import styles from './RelatedCards.module.scss';

export type RelatedCardsProps = {
  className?: string;
  categoryId: number;
};

const PRODUCT_LIMIT = 3;

const RelatedCards: React.FC<RelatedCardsProps> = ({ className, categoryId }) => {
  const productsStore = useLocalStore(() => new ProductsStore());

  React.useEffect(() => {
    productsStore.setProductLimit(PRODUCT_LIMIT);
    productsStore.setFilterParam(String(categoryId));
    productsStore.getProducts();
  }, [productsStore, categoryId]);

  return (
    <div className={cn(styles['related-cards'], className)}>
      <Text tag="h2" view="p-32">Related Items</Text>

      <CardList
        className={styles['related-cards__list']}
        products={productsStore.products}
        productLimit={productsStore.productLimit}
        isLoading={productsStore.isLoading}
      />
    </div>
  );
};

export default observer(RelatedCards);
