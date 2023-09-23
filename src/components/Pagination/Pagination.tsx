import cn from 'classnames';
import * as React from 'react';
import Text from 'components/Text';
import ArrowDefaultIcon from 'components/icons/ArrowDefaultIcon';
import { usePagination, DOTS } from './usePagination';
import styles from './Pagination.module.scss';

export type PaginationProps = {
  className?: string;
  currentPage: number;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  className,
  currentPage,
  totalCount,
  pageSize,
  siblingCount = 0,
  onPageChange
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  }) ?? [];

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <div className={cn(styles['pagination'], className)}>
      <ul className={styles['pagination__list']}>
        <li className={styles['pagination__item']}>
          <button
            className={styles['pagination__button']}
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <Text className={styles['pagination__button-text']} tag="span" view="p-18" weight="medium">
              <ArrowDefaultIcon width={32} height={32} direction="left" />
            </Text>
          </button>
        </li>

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={`${pageNumber}-${index}`} className={styles['pagination__item']}>
                <div className={cn(styles['pagination__button'], styles['pagination__button--disabled'])}>
                  <Text className={styles['pagination__button-text']} tag="span" view="p-18" weight="medium">
                    {DOTS}
                  </Text>
                </div>
              </li>
            );
          }

          return (
            <li key={`${pageNumber}-${index}`} className={styles['pagination__item']}>
              <button
                className={cn(
                  styles['pagination__button'],
                  {[styles['is-current']]: pageNumber === currentPage}
                )}
                type="button"
                onClick={() => onPageChange(+pageNumber)}
              >
                <Text className={styles['pagination__button-text']} tag="span" view="p-18" weight="medium">
                  {pageNumber}
                </Text>
              </button>
            </li>
          );
        })}

        <li className={styles['pagination__item']}>
          <button
            className={styles['pagination__button']}
            type="button"
            disabled={currentPage === paginationRange.at(-1)}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <Text className={styles['pagination__button-text']} tag="span" view="p-18" weight="medium">
              <ArrowDefaultIcon width={32} height={32} direction="right" />
            </Text>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(Pagination);
