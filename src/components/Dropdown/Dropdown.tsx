import cn from 'classnames';
import * as React from 'react';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import styles from './Dropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type DropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущее выбранное значение поля, может быть пустым */
  value: Option | null;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option | null) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. */
  getTitle: (value: Option | null) => string;
};

const MultiDropdown: React.FC<DropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle
}) => {
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  const [isOpened, setIsOpened] = React.useState<boolean>(false);
  const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<string>('');
  const [selectedOption, setSelectedOption] = React.useState<Option | null>(value);

  const filteredOptions = React.useMemo(() =>
    options.filter(({ value }) =>
      value.trim().toLowerCase().includes(filter.trim().toLowerCase())
    ),
  [options, filter]);

  React.useEffect(() => {
    if (disabled) {
      setIsOpened(false);
      setIsTyping(false);
      setFilter('');
    }
  }, [disabled]);

  React.useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const isDropdown = dropdownRef.current?.contains(event.target as HTMLElement);
      if (!isDropdown) {
        setIsOpened(false);
        setIsTyping(false);
        setFilter('');
      }
    };

    const handelDocumentKeydown = (event: KeyboardEvent) => {
      if (event.key === ('Escape' || 'Esc')) {
        setIsOpened(false);
        setIsTyping(false);
        setFilter('');
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
    setIsTyping(true);
  };

  const handleOptionChange = (option: Option) => {
    setIsTyping(false);

    if (selectedOption?.key === option.key) {
      setSelectedOption(null);
      onChange(null);
      return;
    }

    setSelectedOption(option);
    onChange(option);
  };

  const title = React.useMemo(() => getTitle(value), [getTitle, value]);

  const inputValue = React.useMemo(() => {
    if (!isOpened) {
      if (value === null) {
        return '';
      }

      return title;
    }

    if (isTyping) {
      return filter;
    }

    return '';
  }, [isOpened, isTyping, value, title, filter]);

  return (
    <div className={cn(styles['multi-dropdown'], className)} ref={dropdownRef}>
      <Input
        value={inputValue}
        placeholder={title}
        afterSlot={<ArrowDownIcon color="secondary" />}
        disabled={disabled}
        onClick={handelDropdownClick}
        onChange={setFilter}
      />

      {isOpened && (
        <ul className={styles['multi-dropdown__list']}>
          {filteredOptions.map((option: Option) => (
            <li key={option.key} className={styles['multi-dropdown__item']}>
              <input
                className={cn(styles['multi-dropdown__input'], 'visually-hidden')}
                id={`dropdown-${option.key}`}
                type="checkbox"
                checked={selectedOption?.key === option.key}
                onChange={() => handleOptionChange(option)}
              />

              <label
                className={styles['multi-dropdown__label']}
                htmlFor={`dropdown-${option.key}`}
              >
                {option.value}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;