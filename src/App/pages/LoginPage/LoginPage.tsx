import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Input from 'components/Input';
import Button from 'components/buttons/Button';
import { IAuthRequest } from 'models/AuthMode';
import { useAuthStore } from 'store/RootStore/hooks';
import styles from './LoginPage.module.scss';

export type LoginFormError = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const authStore = useAuthStore();

  const handleFormSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    authStore.login();
  }, [authStore]);

  const handleFieldChange = React.useCallback((value: Partial<IAuthRequest>) => {
    authStore.setAuthRequest(value);
  }, [authStore]);

  return (
    <div className={styles['login-page']}>
      <div className={cn(styles['login-page__wrapper'], 'container')}>
        <form className={styles['login-page__form']} action="#" method="post" onSubmit={handleFormSubmit}>
          <Input
            label={'Email'}
            value={authStore.authRequest.email}
            message={authStore.authRequestErrors.email}
            onChange={(value) => handleFieldChange({ email: value })}
          />

          <Input
            label={'Password'}
            type="password"
            value={authStore.authRequest.password}
            message={authStore.authRequestErrors.password}
            onChange={(value) => handleFieldChange({ password: value })}
            autoComplete="off"
          />

          <div className={styles['login-page__controls']}>
            <Button buttonStyle="primary" type="submit">
              Sing in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default observer(LoginPage);
