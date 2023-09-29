import cn from 'classnames';
import * as React from 'react';
import CrossIcon from 'components/icons/CrossIcon';
import styles from './CrossButton.module.scss';

export type CrossButtonProps = {
  className?: string;
  onClick: () => void;
  disabled?: boolean;
};

const CrossButton: React.FC<CrossButtonProps> = ({ className, onClick, disabled }) => {
  return (
    <button
      className={cn(styles['cross-button'], className)}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <CrossIcon className={styles['cross-button__icon']} color="secondary" />
    </button>
  );
};

export default React.memo(CrossButton);
