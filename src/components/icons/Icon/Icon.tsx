import cn from 'classnames';
import * as React from 'react';
import styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  width?: number;
  height?: number;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  width = 24,
  height = 24,
  color,
  children,
  ...props
}) => {
  return(
    <svg
      className={cn(styles.icon, {[styles[`icon--${color}`]]: color}, className)}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
};

export default React.memo(Icon);
