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
      <table className={styles['orders__table']}>
        <caption className={styles['orders__caption']}>
          <Text tag="h2" view="p-32">Orders</Text>
        </caption>

        <thead className={styles['orders__head']}>
          <tr className={styles['orders__row']}>
            <th className={styles['orders__data']}>
              <Text tag="p" view="p-20" weight="bold">Order</Text>
            </th>
            <th className={styles['orders__data']}>
              <Text tag="p" view="p-20" weight="bold">Date</Text>
            </th>
            <th className={cn(styles['orders__data'], styles['orders__data--discount'])}>
              <Text tag="p" view="p-20" weight="bold">Discount</Text>
            </th>
            <th className={styles['orders__data']}>
              <Text tag="p" view="p-20" weight="bold">Total</Text>
            </th>
          </tr>
        </thead>

        <tbody className={styles['orders__body']}>
          {cartStore.orders.length ? (
            cartStore.orders.map((order) => (
              <tr key={order.id} className={styles['orders__row']}>
                <td className={styles['orders__data']}>
                  <Text tag="p" view="p-16">#{order.id}</Text>
                </td>
                <td className={styles['orders__data']}>
                  <Text tag="p" view="p-16">{order.date}</Text>
                </td>
                <td className={cn(styles['orders__data'], styles['orders__data--discount'])}>
                  <Text tag="p" view="p-16">{order.discount ? `${order.discount}%` : '-'}</Text>
                </td>
                <td className={styles['orders__data']}>
                  <Text tag="p" view="p-16">${order.total}</Text>
                </td>
              </tr>
            ))
          ) : (
            <tr className={styles['orders__row']}>
              <td className={cn(styles['orders__data'], styles['orders__data--empty'])} colSpan={4}>
                <Text tag="p" view="p-32">Not yet orders</Text>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default observer(Orders);
