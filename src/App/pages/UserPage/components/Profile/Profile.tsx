import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Text from 'components/Text';
import Button from 'components/buttons/Button';
import { useAuthStore } from 'store/RootStore/hooks';
import styles from './Profile.module.scss';

export type ProfileProps = {
  className?: string;
};

const Profile: React.FC<ProfileProps> = ({ className }) => {
  const authStore = useAuthStore();

  const handleSignOutButtonClick = React.useCallback(() => {
    authStore.logout();
  }, [authStore]);

  return (
    <div className={cn(styles['profile'], className)}>
      <div className={styles['profile__image']}>
        <img src={authStore.profile.avatar} width="160" height="160" alt="User avatar" />
      </div>

      <div className={styles['profile__content']}>
        <Text className={styles['profile__name']} tag="p" view="p-32">
          {authStore.profile.name}
        </Text>

        <Text className={styles['profile__email']} tag="p" view="p-20">
          {authStore.profile.email}
        </Text>

        <Button className={styles['profile__button']} onClick={handleSignOutButtonClick}>
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default observer(Profile);
