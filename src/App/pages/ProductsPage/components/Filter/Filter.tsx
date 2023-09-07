import cn from 'classnames';
import * as React from 'react';
import MultiDropdown from 'components/MultiDropdown';
import styles from './Filter.module.scss';

export type FilterProps = {
  className?: string;
};

const Filter: React.FC<FilterProps> = ({ className }) => {
  return (
    <div className={cn(styles['filter'], className)}>
      <MultiDropdown
        options={[]}
        value={[]}
        onChange={() => {}}
        getTitle={() => 'Filter'}
      />
    </div>
  );
};

export default Filter;
