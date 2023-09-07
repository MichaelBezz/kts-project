import cn from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from 'components/icons/LogoIcon';
import { AppRoute } from 'config/app-route';
import styles from './Logo.module.scss';

export type LogoProps = {
  className?: string;
  width?: number;
  height?: number;
};

const Logo: React.FC<LogoProps> = ({ className, width = 132, height = 42 }) => {
  return (
    <Link className={cn(styles['logo'], className)} to={AppRoute.Main}>
      <LogoIcon className={styles['logo__icon']} width={width} height={height} />
    </Link>
  );
};

export default React.memo(Logo);
