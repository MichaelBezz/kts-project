import cn from 'classnames';
import * as React from 'react';
import Text from 'components/Text';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import styles from './Pagination.module.scss';

export type PaginationProps = {
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({ className }) => {
  return (
    <div className={cn(styles['pagination'], className)}>
      <ul className={styles['pagination__list']}>
        <li className={styles['pagination__item']}>
          <button className={styles['pagination__button']} type="button" disabled>
            <Text className={styles['pagination__button-text']} tag="span" view="p-18" weight="medium">
              <ArrowLeftIcon width={32} height={32} />
            </Text>
          </button>
        </li>
        <li className={styles['pagination__item']}>
          <button className={cn(styles['pagination__button'], styles['pagination__button--current'])} type="button">
            <Text className={styles['pagination__button-text']} tag="span" view="p-18" weight="medium">1</Text>
          </button>
        </li>
        <li className={styles['pagination__item']}>
          <button className={styles['pagination__button']} type="button">
            <Text className={styles['pagination__button-text']} tag="span" view="p-18" weight="medium">2</Text>
          </button>
        </li>
        <li className={styles['pagination__item']}>
          <button className={styles['pagination__button']} type="button">
            <Text className={styles['pagination__button-text']} tag="span" view="p-18" weight="medium">3</Text>
          </button>
        </li>
        <li className={styles['pagination__item']}>
          <button className={styles['pagination__button']} type="button">
            <Text className={styles['pagination__button-text']} tag="span" view="p-18" weight="medium">...</Text>
          </button>
        </li>
        <li className={styles['pagination__item']}>
          <button className={styles['pagination__button']} type="button">
            <Text className={styles['pagination__button-text']} tag="span" view="p-18" weight="medium">10</Text>
          </button>
        </li>
        <li className={styles['pagination__item']}>
          <button className={styles['pagination__button']} type="button">
            <Text className={styles['pagination__button-text']} tag="span" view="p-18" weight="medium">
              <ArrowRightIcon width={32} height={32} />
            </Text>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
