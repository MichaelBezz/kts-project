import cn from 'classnames';
import * as React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import styles from './Search.module.scss';

export type SearchProps = {
  className?: string;
};

const Search: React.FC<SearchProps> = ({ className }) => {
  const [value, setValue] = React.useState<string>('');

  return (
    <div className={cn(styles['search'], className)}>
      <Input
        className={styles['search__input']}
        value={value}
        onChange={setValue}
        placeholder="Search product"
      />

      <Button className={styles['search__button']} buttonStyle="primary">
        Find now
      </Button>
    </div>
  );
};

export default Search;
