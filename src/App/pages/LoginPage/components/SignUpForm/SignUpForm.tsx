import cn from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import Text from 'components/Text';
import Button from 'components/buttons/Button';
import styles from './SignUpForm.module.scss';

export type SignUpFormProps = {
  className?: string;
};

const SignupSchema = Yup.object().shape({
  avatar: Yup.string()
    .trim()
    .url('Enter correct url, for example: https://api.lorem.space/image/face?w=150&h=150'),
  name: Yup.string()
    .trim()
    .required('Required'),
  email: Yup.string()
    .trim()
    .email('Enter correct email, for example: john@mail.com')
    .required('Required'),
  password: Yup.string()
    .trim()
    .min(3, 'The password must contain more than three symbols, for example: changeme')
    .required('Required'),
});

const SignUpForm: React.FC<SignUpFormProps> = ({ className }) => {
  const handleFormSubmit = React.useCallback(() => {

  }, []);

  return (
    <div className={cn(styles['sign-up-form'], className)}>
      <Formik
        initialValues={{ avatar: '', name: '', email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values)
          handleFormSubmit();
        }}
      >
        {({ isValid }) => (
          <Form className={styles['sign-up-form__form']} noValidate>
            <div className={styles['sign-up-form__field']}>
              <label htmlFor="su-avatar">
                <Text tag="p" view="p-20">Avatar:</Text>
              </label>

              <Field
                className={styles['sign-up-form__input']}
                id="su-avatar"
                type="text"
                name="avatar"
                placeholder="https://api.lorem.space/image/face"
              />

              <ErrorMessage name="avatar">
                {(msg) => (
                  <Text tag="p" view="p-14" color="error">{msg}</Text>
                )}
              </ErrorMessage>
            </div>

            <div className={styles['sign-up-form__field']}>
              <label htmlFor="su-name">
                <Text tag="p" view="p-20">Name:</Text>
              </label>

              <Field
                className={styles['sign-up-form__input']}
                id="su-name"
                type="text"
                name="name"
                placeholder="Will Smith"
              />

              <ErrorMessage name="name">
                {(msg) => (
                  <Text tag="p" view="p-14" color="error">{msg}</Text>
                )}
              </ErrorMessage>
            </div>

            <div className={styles['sign-up-form__field']}>
              <label htmlFor="su-email">
                <Text tag="p" view="p-20">Email:</Text>
              </label>

              <Field
                className={styles['sign-up-form__input']}
                id="su-email"
                type="email"
                name="email"
                placeholder="will@mail.com"
              />

              <ErrorMessage name="email">
                {(msg) => (
                  <Text tag="p" view="p-14" color="error">{msg}</Text>
                )}
              </ErrorMessage>
            </div>

            <div className={styles['sign-up-form__field']}>
              <label htmlFor="su-password">
                <Text tag="p" view="p-20">Password:</Text>
              </label>

              <Field
                className={styles['sign-up-form__input']}
                id="su-password"
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
              className={styles['sign-up-form__button']}
              buttonStyle="primary"
              type="submit"
              disabled={!isValid}
            >
              Sing up
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
