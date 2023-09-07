import cn from 'classnames';
import * as React from 'react';
import Loader from 'components/Loader';
import Text from 'components/Text';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  /** Состояние загрузки */
  loading?: boolean;
  /** Состояние блокировки */
  disabled?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  className,
  loading,
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        styles['button'],
        {[styles['button--disabled']]: disabled},
        className
      )}
      type="button"
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader className={styles['button__loader']} size="s" color="secondary" />
      )}

      <Text className={styles['button__text']} tag="span" view="button">
        {children}
      </Text>
    </button>
  );
};

export default Button;
