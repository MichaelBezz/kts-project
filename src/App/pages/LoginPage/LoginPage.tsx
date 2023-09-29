import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import Text from 'components/Text';
import { AppRoute } from 'config/app-route';
import { useAuthStore } from 'store/RootStore/hooks';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SingInForm/SignInForm';
import styles from './LoginPage.module.scss';

enum Tab {
  signIn = 'Sign in',
  signUp = 'Sign up',
};

const TABS: Tab[] = Object.values(Tab);

const LoginPage: React.FC = () => {
  const authStore = useAuthStore();

  const [searchParams] = useSearchParams();
  const searchTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = React.useState<string>();

  React.useEffect(() => {
    const isValidTab = searchTab && TABS.some((tab) => tab === searchTab);

    if (isValidTab) {
      setActiveTab(searchTab);
    } else {
      setActiveTab(Tab.signIn);
    }
  }, [searchTab]);

  if (authStore.isAuth) {
    return (<Navigate to={AppRoute.user} />);
  }

  return (
    <div className={styles['login-page']}>
      <div className={cn(styles['login-page__wrapper'], 'container')}>
        <div className={styles['login-page__form']}>
          <ul className={styles['login-page__header']}>
            {TABS.map((tab) => (
              <li key={tab} className={styles['login-page__item']}>
                <Link
                  className={cn(
                    styles['login-page__link'],
                    {[styles['login-page__link--active']]: tab === activeTab}
                  )}
                  to={`?tab=${tab}`}
                >
                  <Text tag="p" view="p-20">
                    {tab}
                  </Text>
                </Link>
              </li>
            ))}
          </ul>

          {activeTab === Tab.signIn && <SignInForm />}
          {activeTab === Tab.signUp && <SignUpForm />}
        </div>
      </div>
    </div>
  );
};

export default observer(LoginPage);
