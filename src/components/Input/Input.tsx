import cn from 'classnames';
import * as React from 'react';
import Text from 'components/Text';
import styles from './Input.module.scss'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  className?: string;
  /** Текст label */
  label?: string;
  /** Значение поля */
  value: string;
  /** Информационное сообщение */
  message?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, value, message, onChange, afterSlot, ...props }, ref) => {
    const id = React.useId();

    return(
      <div className={cn(styles['input'], className)}>
         {label && (
          <label className={styles['input__label']} htmlFor={id}>
            <Text tag="p" view="p-18">{label}</Text>
          </label>
        )}

        <input
          className={cn(
            styles['input__field'],
            {[styles['input__field--with-slot']]: afterSlot}
            )}
          ref={ref}
          id={id}
          type="text"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
          {...props}
        />

        {!!afterSlot && (
          <div className={styles['input__slot']}>{afterSlot}</div>
        )}

        {message && (
          <Text tag="p" view="p-14" color="error">{message}</Text>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default React.memo(Input);
