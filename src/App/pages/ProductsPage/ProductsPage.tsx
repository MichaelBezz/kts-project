import * as React from 'react';
import Text from 'components/Text';
// import Filter from './components/Filter';
import ProductList from './components/ProductList';
// import Search from './components/Search';
import styles from './ProductsPage.module.scss';

const ProductsPage: React.FC = () => {
  return(
    <div className={styles['products-page']}>
      <div className="container">
        <div className={styles['products-page__header']}>
          <Text className={styles['products-page__title']} tag="h1" view="title" color="primary">
            Products
          </Text>

          <Text className={styles['products-page__description']} view="p-20" color="secondary">
            We&nbsp;display products based on&nbsp;the latest products we&nbsp;have,
            if&nbsp;you want to&nbsp;see our old products please enter the name of&nbsp;the item
          </Text>
        </div>

        {/* <Search className={styles['products-page__search']} /> */}
        {/* <Filter className={styles['products-page__filter']} /> */}
        <ProductList className={styles['products-page__cards']} />
      </div>
    </div>
  );
};

export default ProductsPage;
