import cn from 'classnames';
import * as React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import styles from './Search.module.scss';

export type SearchProps = {
  className?: string;
};

const Search: React.FC<SearchProps> = ({ className }) => {
  return (
    <div className={cn(styles['search'], className)}>
      <Input
        className={styles['search__input']}
        value=""
        onChange={() => {}}
        placeholder="Search product"
      />

      <Button className={styles['search__button']}>
        Find now
      </Button>
    </div>
  );
};

export default Search;
