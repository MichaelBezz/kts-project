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

const MultiDropdown: React.FC<MultiDropdownProps> = ({
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

  const selectedSet = React.useMemo(() => new Set(value), [value]);

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

    if (selectedSet.has(option)) {
      onChange(value.filter(({ key }) => key !== option.key));
      return;
    }

    onChange([...value, option]);
  };

  const title = React.useMemo(() => getTitle(value), [getTitle, value]);

  const inputValue = React.useMemo(() => {
    if (!isOpened) {
      if (value.length === 0) {
        return '';
      }

      return title;
    }

    if (isTyping) {
      return filter;
    }

    return '';
  }, [isOpened, isTyping, value.length, title, filter]);

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
                checked={selectedSet.has(option)}
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
