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
  ({ className, value = '', onChange, afterSlot, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState<string>(value);

    React.useEffect(() => {setInputValue(value)}, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setInputValue(value);
      onChange(value);
    };

    return(
      <div className={cn(styles['input'], className)}>
        <input
          className={cn(
            styles['input__field'],
            {[styles['input__field--with-slot']]: afterSlot}
            )}
          ref={ref}
          type="text"
          value={inputValue}
          onChange={handleChange}
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

export default Input;
