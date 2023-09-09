import cn from 'classnames';
import * as React from 'react';
import Text from 'components/Text';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { usePagination, DOTS } from 'hooks/usePagination';
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

  const handelNextButtonClick = () => {
    onPageChange(currentPage + 1);
  };

  const handelPrevButtonClick = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className={cn(styles['pagination'], className)}>
      <ul className={styles['pagination__list']}>
        <li className={styles['pagination__item']}>
          <button
            className={styles['pagination__button']}
            type="button"
            disabled={currentPage === 1}
            onClick={handelPrevButtonClick}
          >
            <Text className={styles['pagination__button-text']} tag="span" view="p-18" weight="medium">
              <ArrowLeftIcon width={32} height={32} />
            </Text>
          </button>
        </li>

        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li key={pageNumber} className={styles['pagination__item']}>
                <div className={styles['pagination__button']}>
                  <Text className={styles['pagination__button-text']} tag="span" view="p-18" weight="medium">
                    {DOTS}
                  </Text>
                </div>
              </li>
            );
          }

          return (
            <li key={pageNumber} className={styles['pagination__item']}>
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
            disabled={currentPage === paginationRange.at(- 1)}
            onClick={handelNextButtonClick}
          >
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
