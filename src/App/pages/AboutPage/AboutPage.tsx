import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Text from 'components/Text';
import Loader from 'components/loaders/Loader';
import UserStore from 'store/UserStore';
import { UserStoreContext, useLocalStore } from 'store/hooks';
import ClientList from './components/ClientList';
import styles from './AboutPage.module.scss';

const AboutPage: React.FC = () => {
  const userStore = useLocalStore(() => new UserStore());

  React.useEffect(() => {
    userStore.getUsers();
  }, [userStore]);

  if (userStore.isLoading) {
    return (<Loader size="general" />);
  }

  return (
    <UserStoreContext.Provider value={userStore}>
      <div className={styles['about-page']}>
        <div className="container">
          <div className={styles['about-page__header']}>
            <Text className={styles['about-page__title']} tag="h1" view="title" color="primary">
              About us
            </Text>

            <Text className={styles['about-page__description']} view="p-20" color="secondary">
              We&nbsp;are proud of&nbsp;our customers, so&nbsp;below you can see the best of&nbsp;them.
              If&nbsp;you are not among them, make a&nbsp;few more orders and you will definitely appear there.
            </Text>
          </div>

          <ClientList className={styles['about-page__body']} />
        </div>
      </div>
    </UserStoreContext.Provider>
  );
};

export default observer(AboutPage);
