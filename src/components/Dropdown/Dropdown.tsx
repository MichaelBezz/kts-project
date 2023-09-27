import cn from 'classnames';
import * as React from 'react';
import Input from 'components/Input';
import CrossButton from 'components/buttons/CrossButton';
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
  /** Текущее id выбранного значения поля, может быть пустым */
  valueId: string | null;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option | null) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. */
  getTitle: (value: Option | null) => string;
};

const Dropdown: React.FC<DropdownProps> = ({
  className,
  options,
  valueId,
  onChange,
  disabled,
  getTitle
}) => {
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  const [isOpened, setIsOpened] = React.useState<boolean>(false);
  const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<string>('');
  const [selectedOption, setSelectedOption] = React.useState<Option | null>(null);

  const filteredOptions = React.useMemo(() =>
    options.filter(({ value }) =>
      value.trim().toLowerCase().includes(filter.trim().toLowerCase())
    ),
  [options, filter]);

  const optionParam = React.useMemo(() => {
    return options.find(({ key }) => key === valueId) || null;
  }, [options, valueId]);

  React.useEffect(() => {
    setSelectedOption(optionParam);
  }, [optionParam]);

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

    const handleDocumentKeydown = (event: KeyboardEvent) => {
      if (event.key === ('Escape' || 'Esc')) {
        setIsOpened(false);
        setIsTyping(false);
        setFilter('');
      }
    };

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeydown);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleDocumentKeydown);
    };
  }, []);

  const handleDropdownClick = React.useCallback(() => {
    setIsOpened(true);
    setIsTyping(true);
  }, []);

  const handleOptionChange = React.useCallback((option: Option) => {
    setIsTyping(false);

    if (selectedOption?.key === option.key) {
      setSelectedOption(null);
      onChange(null);
      return;
    }

    setSelectedOption(option);
    onChange(option);
  }, [onChange, selectedOption?.key]);

  const handleCrossButtonClick = React.useCallback(() => {
    setSelectedOption(null);
    onChange(null);
  }, [onChange]);

  const title = React.useMemo(() => getTitle(selectedOption), [getTitle, selectedOption]);

  const inputValue = React.useMemo(() => {
    if (!isOpened) {
      if (selectedOption === null) {
        return '';
      }

      return title;
    }

    if (isTyping) {
      return filter;
    }

    return '';
  }, [isOpened, isTyping, selectedOption, title, filter]);

  const slot = React.useMemo(() => {
    if (selectedOption) {
      return (
        <CrossButton
          onClick={handleCrossButtonClick}
          disabled={disabled}
        />
      );
    }

    return (
      <ArrowDownIcon
        className={cn(
          styles['dropdown__icon'],
          {[styles['dropdown__icon--active']]: isOpened}
        )}
        color="secondary"
      />
    );
  }, [selectedOption, isOpened, handleCrossButtonClick, disabled]);

  return (
    <div className={cn(styles['dropdown'], className)} ref={dropdownRef}>
      <Input
        value={inputValue}
        placeholder={title}
        afterSlot={slot}
        disabled={disabled}
        onClick={handleDropdownClick}
        onChange={setFilter}
      />

      {isOpened && (
        <ul className={styles['dropdown__list']}>
          {filteredOptions.map((option: Option) => (
            <li key={option.key} className={styles['dropdown__item']}>
              <input
                className={cn(styles['dropdown__input'], 'visually-hidden')}
                id={`dropdown-${option.key}`}
                type="checkbox"
                checked={selectedOption?.key === option.key}
                onChange={() => handleOptionChange(option)}
              />

              <label
                className={styles['dropdown__label']}
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

export default Dropdown;
