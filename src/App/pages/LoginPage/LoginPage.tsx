import cn from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Text from 'components/Text';
import Button from 'components/buttons/Button';
import { IAuthRequest } from 'models/AuthMode';
import { useAuthStore } from 'store/RootStore/hooks';
import styles from './LoginPage.module.scss';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Enter the correct email, for example: john@mail.com')
    .required('Required'),
  password: Yup.string()
    .trim()
    .min(3, 'The password must contain more than three symbols, for example: changeme')
    .required('Required'),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const authStore = useAuthStore();
  const isAuth = authStore.isAuth;

  React.useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const handleFormSubmit = React.useCallback((value: IAuthRequest) => {
    authStore.setAuthRequest(value);
    authStore.login();
    authStore.setAuthRequest({ email: '', password: '' });
  }, [authStore]);

  return (
    <div className={styles['login-page']}>
      <div className={cn(styles['login-page__wrapper'], 'container')}>
        {authStore.isError && (
          <Text className={styles['login-page__message']} tag="p" view="p-24" color="error">
            Email or password entered incorrectly, try again
          </Text>
        )}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SignupSchema}
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

export default observer(LoginPage);
