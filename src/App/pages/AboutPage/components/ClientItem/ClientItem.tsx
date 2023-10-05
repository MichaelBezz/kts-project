import cn from 'classnames';
import * as React from 'react';
import Text from 'components/Text';
import UserModel from 'models/UserModel';
import styles from './ClientItem.module.scss';

export type ClientItemProps = {
  className?: string;
  client: UserModel;
};

const ClientItem: React.FC<ClientItemProps> = ({ className, client }) => {
  return (
    <div className={cn(styles['client-item'], className)}>
      <div className={styles['client-item__image']}>
        <img
          src={client.avatar
            ? client.avatar
            : 'https://placehold.co/120x120?text=Avatar'
          }
          width="120"
          height="120"
          alt={`Avatar ${client.name}`}
        />
      </div>

      <div className={styles['client-item__content']}>
        <Text className={styles['client-item__title']} tag="p" view="p-18" weight="bold">
          {client.name}
        </Text>
      </div>
    </div>
  );
};

export default React.memo(ClientItem);
