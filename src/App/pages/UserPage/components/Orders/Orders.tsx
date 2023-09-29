import cn from 'classnames';
import * as React from 'react';
import Text from 'components/Text';
import styles from './Orders.module.scss';

export type OrdersProps = {
  className?: string;
};

const Orders: React.FC<OrdersProps> = ({ className }) => {
  return (
    <div className={cn(styles['orders'], className)}>
      <Text tag="h2" view="p-32">
        Orders
      </Text>
    </div>
  );
};

export default React.memo(Orders);
