import cn from 'classnames';
import * as React from 'react';
import LoginForm from './components/LoginForm';
import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  return (
    <div className={styles['login-page']}>
      <div className={cn(styles['login-page__wrapper'], 'container')}>
        <LoginForm className={styles['login-page__form']} />
      </div>
    </div>
  );
};

export default LoginPage;
