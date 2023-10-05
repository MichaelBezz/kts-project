import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import Text from 'components/Text';
import Loader from 'components/loaders/Loader';
import { AppRoute } from 'config/app-route';
import { useAuthStore } from 'store/RootStore/hooks';
import Orders from './components/Orders';
import Profile from './components/Profile';
import styles from './UserPage.module.scss';

const UserPage: React.FC = () => {
  const authStore = useAuthStore();

  if (authStore.isAuthUnknown || authStore.isLoading) {
    return <Loader size="general" />;
  }

  if (!authStore.isAuth) {
    return (<Navigate to={AppRoute.login} />);
  }

  return (
    <div className={styles['user-page']}>
      <div className={cn(styles['user-page__wrapper'], 'container')}>
        <Text tag="h1" view="title" color="primary">
          Your profile
        </Text>

        <div className={styles['user-page__body']}>
          <div className={styles['user-page__profile']}>
            <Profile />
          </div>
          <Orders />
        </div>
      </div>
    </div>
  );
};

export default observer(UserPage);
