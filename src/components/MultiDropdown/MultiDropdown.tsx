import cn from 'classnames';
import * as React from 'react';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import styles from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const formatOptionValue = (value: string): string =>
  value.trim().toLowerCase();

const filterOptionsByValue = (currentValue: string, options: Option[]): Option[] => {
  const target = formatOptionValue(currentValue);

  return options.filter(({value}) => formatOptionValue(value).includes(target));
};

const checkOptionByKey = (currentKey: string, options: Option[]): boolean => {
  return options.some(({key}) => key === currentKey);
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle
}) => {
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  const [items, setItems] = React.useState<Option[]>(options);
  const [checkedItems, setCheckedItems] = React.useState<Option[]>(value);
  const [isOpened, setIsOpened] = React.useState<boolean>(false);

  React.useEffect(() => {setItems(options)}, [options]);
  React.useEffect(() => {setIsOpened(false)}, [disabled]);

  React.useEffect(() => {
    if (isOpened === false) {
      setItems(options);
    }
  }, [isOpened, options]);

  React.useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const isDropdown = dropdownRef.current?.contains(event.target as HTMLElement);
      !isDropdown && setIsOpened(false);
    };

    const handelDocumentKeydown = (event: KeyboardEvent) => {
      if (event.key === ('Escape' || 'Esc')) {
        setIsOpened(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handelDocumentKeydown);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handelDocumentKeydown);
    };
  }, []);

  const handelDropdownClick = () => {
    setIsOpened(true);
  };

  const handelDropdownChange = (value: string) => {
    setItems(filterOptionsByValue(value, options));
  };

  const handleOptionChange = (option: Option) => {
    const isChecked = checkOptionByKey(option.key, checkedItems);
    let newState: Option[];

    if (isChecked) {
      newState = checkedItems.filter(({key}) => key !== option.key);
      onChange(newState);
    } else {
      newState = [...checkedItems, option];
      onChange([option]);
    }

    setCheckedItems(newState);
  };

  const icon = <ArrowDownIcon color="secondary" />;

  return (
    <div className={cn(styles['multi-dropdown'], className)} ref={dropdownRef}>
      <Input
        value={checkedItems.length && !isOpened ? getTitle(checkedItems) : ''}
        placeholder={!checkedItems.length || isOpened ? getTitle(checkedItems) : ''}
        afterSlot={icon}
        disabled={disabled}
        onClick={handelDropdownClick}
        onChange={handelDropdownChange}
      />

      {isOpened && (
        <ul className={styles['multi-dropdown__list']}>
          {items.map(({key, value}: Option) => (
            <li key={key} className={styles['multi-dropdown__item']}>
              <input
                className={cn(styles['multi-dropdown__input'], 'visually-hidden')}
                id={`dropdown-${key}`}
                type="checkbox"
                checked={checkOptionByKey(key, checkedItems)}
                onChange={() => handleOptionChange({key, value})}
              />

              <label
                className={styles['multi-dropdown__label']}
                htmlFor={`dropdown-${key}`}
              >
                {value}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
