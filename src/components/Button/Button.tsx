import cn from 'classnames';
import * as React from 'react';
import Loader from 'components/Loader';
import Text from 'components/Text';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  /** Тип кнопки */
  buttonStyle?: 'primary' | 'secondary';
  /** Слот для иконки */
  iconSlot?: React.ReactNode;
  /** Состояние загрузки */
  loading?: boolean;
  /** Состояние блокировки */
  disabled?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  className,
  buttonStyle,
  iconSlot,
  loading,
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        styles['button'],
        {[styles[`button--${buttonStyle}`]]: buttonStyle},
        {[styles['button--with-icon']]: !!iconSlot},
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

      {!!iconSlot && (
        <div className={styles['button__icon']}>{iconSlot}</div>
      )}

      <Text className={styles['button__text']} tag="span" view="button">
        {children}
      </Text>
    </button>
  );
};

export default Button;
