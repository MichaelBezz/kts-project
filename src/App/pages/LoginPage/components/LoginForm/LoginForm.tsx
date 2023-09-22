import cn from 'classnames';
import * as React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import styles from './LoginForm.module.scss';

export type LoginFormProps = {
  className?: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  return (
    <form
      className={cn(styles['login-form'], className)}
      action="#"
      method="post"
    >
      <Input
        label={'Email'}
        value={''}
        onChange={() => {}}
      />

      <Input
        label={'Password'}
        type="password"
        value={''}
        onChange={() => {}}
        autoComplete="off"
      />

      <div className={styles['login-form__controls']}>
        <Button buttonStyle="primary">
          Sing in
        </Button>

        <Button buttonStyle="secondary">
          Sing up
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
