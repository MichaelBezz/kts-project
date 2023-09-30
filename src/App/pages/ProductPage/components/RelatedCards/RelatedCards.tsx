import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import CardList from 'components/CardList';
import Message from 'components/Message';
import Text from 'components/Text';
import { useProductStore } from 'store/hooks';
import styles from './RelatedCards.module.scss';

export type RelatedCardsProps = {
  className?: string;
};

const RelatedCards: React.FC<RelatedCardsProps> = ({ className }) => {
  const { relatedProducts, isLoading, isSuccess, isError } = useProductStore();

  return (
    <div className={cn(styles['related-cards'], className)}>
      <Text tag="h2" view="p-32">Related Items</Text>

      {isError && (
        <Message>Error. Try again.</Message>
      )}

      {(isSuccess && !relatedProducts.length) && (
        <Message>There aren`t related items.</Message>
      )}

      <CardList
        className={styles['related-cards__list']}
        products={relatedProducts}
        productLimit={3}
        isLoading={isLoading}
      />
    </div>
  );
};

export default observer(RelatedCards);
