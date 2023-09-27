import cn from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as React from 'react';
import Text from 'components/Text';
import Button from 'components/buttons/Button';
import { IAuthRequest } from 'models/AuthMode';
import { useAuthStore } from 'store/RootStore/hooks';
import { validate } from 'utils/validate';
import styles from './LoginPage.module.scss';

export type LoginFormError = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const authStore = useAuthStore();

  const handleFormSubmit = React.useCallback((value: IAuthRequest) => {
    authStore.setAuthRequest(value);
    authStore.login();
  }, [authStore]);

  return (
    <div className={styles['login-page']}>
      <div className={cn(styles['login-page__wrapper'], 'container')}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={validate}
          onSubmit={(values) => {
            handleFormSubmit(values);
          }}
        >
          {({ isValid }) => (
            <Form className={styles['login-page__form']} noValidate>
              <div className={styles['login-page__field']}>
                <label htmlFor="l-email">
                  <Text tag="p" view="p-20">Email</Text>
                </label>

                <Field
                  className={styles['login-page__input']}
                  id="l-email"
                  type="email"
                  name="email"
                />

                <ErrorMessage name="email">
                  {(msg) => (
                    <Text tag="p" view="p-14" color="error">{msg}</Text>
                  )}
                </ErrorMessage>
              </div>

              <div className={styles['login-page__field']}>
                <label htmlFor="l-password">
                  <Text tag="p" view="p-20">Password</Text>
                </label>

                <Field
                  className={styles['login-page__input']}
                  id="l-password"
                  type="password"
                  name="password"
                  autoComplete="off"
                />

                <ErrorMessage name="password">
                  {(msg) => (
                      <Text tag="p" view="p-14" color="error">{msg}</Text>
                    )}
                </ErrorMessage>
              </div>

              <Button
                className={styles['login-page__in-button']}
                buttonStyle="primary"
                type="submit"
                disabled={!isValid}
              >
                Sing in
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default React.memo(LoginPage);
