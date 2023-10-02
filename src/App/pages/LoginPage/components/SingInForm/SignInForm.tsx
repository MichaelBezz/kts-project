import cn from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import * as Yup from 'yup';
import Text from 'components/Text';
import Button from 'components/buttons/Button';
import { IAuthRequest } from 'models/AuthMode';
import { useAuthStore } from 'store/RootStore/hooks';
import { Meta } from 'utils/meta';
import styles from './SignInForm.module.scss';

export type SignInFormProps = {
  className?: string;
};

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Enter correct email, for example: john@mail.com')
    .required('Required'),
  password: Yup.string()
    .trim()
    .min(3, 'The password must contain more than three symbols, for example: changeme')
    .required('Required'),
});

const SignInForm: React.FC<SignInFormProps> = ({ className }) => {
  const authStore = useAuthStore();
  const isError = authStore.isError;

  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isError) {
      timer = setTimeout(() => {
        authStore.setMeta(Meta.initial);
      }, 2000);
    }

    return () => {
      timer && clearTimeout(timer);
      timer = null;
    };
  }, [authStore, isError]);

  const handleFormSubmit = React.useCallback((value: IAuthRequest) => {
    authStore.login(value);
  }, [authStore]);

  return (
    <motion.div
      className={cn(styles['sign-in-form'], className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {authStore.isError && (
        <Text className={styles['sign-in-form__message']} tag="p" view="p-18" color="error">
          Email or password entered incorrectly
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
          <Form className={styles['sign-in-form__form']} noValidate>
            <div className={styles['sign-in-form__field']}>
              <label htmlFor="si-email">
                <Text tag="p" view="p-20">Email:</Text>
              </label>

              <Field
                className={styles['sign-in-form__input']}
                id="si-email"
                type="email"
                name="email"
                placeholder="john@mail.com"
              />

              <ErrorMessage name="email">
                {(msg) => (
                  <Text tag="p" view="p-14" color="error">{msg}</Text>
                )}
              </ErrorMessage>
            </div>

            <div className={styles['sign-in-form__field']}>
              <label htmlFor="si-password">
                <Text tag="p" view="p-20">Password:</Text>
              </label>

              <Field
                className={styles['sign-in-form__input']}
                id="si-password"
                type="password"
                name="password"
                placeholder="changeme"
                autoComplete="off"
              />

              <ErrorMessage name="password">
                {(msg) => (
                    <Text tag="p" view="p-14" color="error">{msg}</Text>
                  )}
              </ErrorMessage>
            </div>

            <Button
              className={styles['sign-in-form__button']}
              buttonStyle="primary"
              type="submit"
              disabled={!isValid}
            >
              Sing in
            </Button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default observer(SignInForm);
