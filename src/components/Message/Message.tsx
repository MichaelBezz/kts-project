import cn from 'classnames';
import * as React from 'react';
import Text from 'components/Text';
import styles from './Message.module.scss';

export type MessageProps = {
  className?: string;
};

const Message: React.FC<React.PropsWithChildren<MessageProps>> = ({ className, children }) => {
  return (
    <div className={cn(styles['message'], className)}>
      <Text tag="p" view="title" color="accent">
        {children}
      </Text>
    </div>
  );
};

export default React.memo(Message);
