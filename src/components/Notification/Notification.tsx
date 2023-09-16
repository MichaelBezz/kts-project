import cn from 'classnames';
import * as React from 'react';
import Text from 'components/Text';
import styles from './Notification.module.scss';

export type NotificationProps = {
  className?: string;
};

const Notification: React.FC<React.PropsWithChildren<NotificationProps>> = ({ className, children }) => {
  return (
    <div className={cn(styles['notification'], className)}>
      <Text tag="p" view="title" color="accent">
        {children}
      </Text>
    </div>
  );
};

export default React.memo(Notification);
