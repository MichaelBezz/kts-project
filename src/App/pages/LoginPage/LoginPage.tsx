import cn from 'classnames';
import * as React from 'react';
import Input from 'components/Input';
import Button from 'components/buttons/Button';
import { IAuthRequest } from 'models/AuthMode';
import { validate } from 'utils/validate';
import styles from './LoginPage.module.scss';

export type LoginFormError = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [formData, setFormData] = React.useState<IAuthRequest>({email: '', password: ''});
  const [errorData, setErrorData] = React.useState<LoginFormError>({email: '', password: ''});

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate(formData, setErrorData)) {
      setFormData({email: '', password: ''});
    }
  };

  return (
    <div className={styles['login-page']}>
      <div className={cn(styles['login-page__wrapper'], 'container')}>
        <form className={styles['login-page__form']} action="#" method="post" onSubmit={handleFormSubmit}>
          <Input
            label={'Email'}
            value={formData.email}
            message={errorData.email}
            onChange={(value) =>
              setFormData((prevState) => ({...prevState, email: value}))
            }
          />

          <Input
            label={'Password'}
            type="password"
            value={formData.password}
            message={errorData.password}
            onChange={(value) =>
              setFormData((prevState) => ({...prevState, password: value}))}
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

export default LoginPage;
