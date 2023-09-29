import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Text from 'components/Text';
import { useCartStore } from 'store/RootStore/hooks';
import styles from './Orders.module.scss';

export type OrdersProps = {
  className?: string;
};

const Orders: React.FC<OrdersProps> = ({ className }) => {
  const cartStore = useCartStore();

  return (
    <div className={cn(styles['orders'], className)}>
      <Text tag="h2" view="p-32">
        Orders
      </Text>

      <ul className={styles['orders__list']}>
        <li className={styles['orders__item']}>
          <Text tag="p" view="p-24" weight="bold">Order#</Text>
          <Text tag="p" view="p-24" weight="bold">Cost</Text>
        </li>

        {cartStore.orders.length ? (
          cartStore.orders.map((order) => (
            <li key={order.id} className={styles['orders__item']}>
              <Text tag="p" view="p-20">{order.id}</Text>
              <Text tag="p" view="p-20">${order.total}</Text>
            </li>
          ))
        ) : (
          <li className={cn(styles['orders__item'], styles['orders__item--empty'])}>
            <Text tag="p" view="p-32">Not yet orders</Text>
          </li>
        )}
      </ul>
    </div>
  );
};

export default observer(Orders);
