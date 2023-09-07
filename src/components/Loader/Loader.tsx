import cn from 'classnames';
import * as React from 'react';
import LoaderIcon from 'components/icons/LoaderIcon';
import styles from './Loader.module.scss';

export type LoaderProps = {
  className?: string;
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Цвет */
  color?: 'primary' | 'secondary';
};

const Loader: React.FC<LoaderProps> = ({ className, size = 'l', color = 'primary' }) => {
  return (
    <div className={cn(
      styles['loader'],
      {[styles[`loader--${size}`]]: size},
      {[styles[`loader--${color}`]]: color},
      className
    )}>
      <LoaderIcon className="loader__icon" />
    </div>
  );
};

export default Loader;
