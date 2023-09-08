import cn from 'classnames';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Text from 'components/Text';
import { NAV_LINKS } from 'config/nav-links';
import styles from './Nav.module.scss';

export type NavProps = {
  className?: string;
};

const Nav: React.FC<NavProps> = ({ className }) => {
  const location = useLocation();

  return (
    <nav className={cn(styles['nav'], className)}>
      <ul className={styles['nav__list']}>
        {NAV_LINKS.map(({route, text}) => {
          const isActive = route === location.pathname;

          return (
            <li key={route} className={styles['nav__item']}>
              <Link
                className={cn(
                  styles['nav__link'],
                  {[styles['nav__link--active']]: isActive}
                )}
                to={route}
              >
                <Text tag="span" view="p-18" weight={isActive ? 'medium' : 'normal'}>
                  {text}
                </Text>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default React.memo(Nav);
