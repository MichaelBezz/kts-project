import cn from 'classnames';
import * as React from 'react';
import Text from 'components/Text';
import CheckIcon from 'components/icons/CheckIcon';
import styles from './CheckBox.module.scss';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  className?: string,
  /** Текст label */
  label: string;
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  label,
  checked,
  onChange,
  ...props
}) => {
  const id = React.useId();

  const handleCheckBoxChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.checked);
    }, [onChange]
  );

  return (
    <div className={cn(styles['checkbox'], className)}>
      <input
        id={id}
        className={cn(styles['checkbox__input'], 'visually-hidden')}
        type="checkbox"
        checked={checked}
        onChange={handleCheckBoxChange}
        {...props}
      />

      <label className={styles['checkbox__label']} htmlFor={id}>
        <div className={styles['checkbox__box']}>
          {checked && (
            <CheckIcon className={styles['checkbox__icon']} width={20} height={20} />
          )}
        </div>

        <Text tag="p" view="p-14">{label}</Text>
      </label>
    </div>
  );
};

export default React.memo(CheckBox);
