import cn from 'classnames';
import * as React from 'react';
import styles from './Input.module.scss'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  className?: string;
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, afterSlot, ...props }, ref) => {
    return(
      <div className={cn(styles['input'], className)}>
        <input
          className={cn(
            styles['input__field'],
            {[styles['input__field--with-slot']]: afterSlot}
            )}
          ref={ref}
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
      </div>
    );
  }
);

Input.displayName = 'Input';

export default React.memo(Input);
