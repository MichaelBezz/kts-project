import cn from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { motion } from 'framer-motion';
import * as React from 'react';
import * as Yup from 'yup';
import CheckBox from 'components/CheckBox';
import Text from 'components/Text';
import Button from 'components/buttons/Button';
import { UserProfile } from 'models/UserModel';
import { useAuthStore } from 'store/RootStore/hooks';
import UserStore from 'store/UserStore';
import { useLocalStore } from 'store/hooks';
import styles from './SignUpForm.module.scss';

export type SignUpFormProps = {
  className?: string;
};

const SignupSchema = Yup.object().shape({
  avatar: Yup.string()
    .trim()
    .url('Enter correct url, for example: https://loremflickr.com/300/300/man')
    .required('Required'),
  name: Yup.string()
    .trim()
    .required('Required'),
  email: Yup.string()
    .trim()
    .email('Enter correct email, for example: john@mail.com')
    .required('Required'),
  password: Yup.string()
    .trim()
    .min(4, 'The password must contain more than four symbols, for example: changeme')
    .required('Required'),
});

const SignUpForm: React.FC<SignUpFormProps> = ({ className }) => {
  const authStore = useAuthStore();
  const userStore = useLocalStore(() => new UserStore());

  const [checked, setChecked] = React.useState<boolean>(false);

  const handleCheckBoxChange = React.useCallback((status: boolean) => {
    setChecked(status);
  }, []);

  const handleFormSubmit = React.useCallback(
    async (user: UserProfile) => {
      await userStore.createUser(user);
      await authStore.login({ email: user.email, password: user.password });
    },
  [authStore, userStore]);

  return (
    <motion.div
      className={cn(styles['sign-up-form'], className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Formik
        initialValues={{ avatar: '', name: '', email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          handleFormSubmit(values);
        }}
      >
        {({ isValid }) => (
          <Form className={styles['sign-up-form__form']} noValidate>
            <div className={styles['sign-up-form__field']}>
              <label className={styles['sign-up-form__label']} htmlFor="su-avatar">
                <Text tag="p" view="p-20">Avatar:</Text>
                <Text tag="p" view="p-20" color="error"><sup>*</sup></Text>
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
              <label className={styles['sign-up-form__label']} htmlFor="su-name">
                <Text tag="p" view="p-20">Name:</Text>
                <Text tag="p" view="p-20" color="error"><sup>*</sup></Text>
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
              <label className={styles['sign-up-form__label']} htmlFor="su-email">
                <Text tag="p" view="p-20">Email:</Text>
                <Text tag="p" view="p-20" color="error"><sup>*</sup></Text>
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
              <label className={styles['sign-up-form__label']} htmlFor="su-password">
                <Text tag="p" view="p-20">Password:</Text>
                <Text tag="p" view="p-20" color="error"><sup>*</sup></Text>
              </label>

              <Field
                className={styles['sign-up-form__input']}
                id="su-password"
                type={checked ? 'text' : 'password'}
                name="password"
                placeholder="changeme"
                autoComplete="off"
              />

              <ErrorMessage name="password">
                {(msg) => (
                    <Text tag="p" view="p-14" color="error">{msg}</Text>
                  )}
              </ErrorMessage>

              <CheckBox label={'Show password'} checked={checked} onChange={handleCheckBoxChange} />
            </div>

            <div className={styles['sign-up-form__required']}>
              <Text tag="p" view="p-20" color="error">*</Text>
              <Text tag="p" view="p-20"><sub>required fields</sub></Text>
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
    </motion.div>
  );
};

export default React.memo(SignUpForm);
