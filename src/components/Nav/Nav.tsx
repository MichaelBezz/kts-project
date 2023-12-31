import cn from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Text from 'components/Text';
import { AppRoute } from 'config/app-route';
import styles from './Nav.module.scss';

export type NavProps = {
  className?: string;
};

export const NAV_LINKS = [
  {
    route: AppRoute.index,
    text: 'Products'
  },
  {
    route: AppRoute.categories,
    text: 'Categories'
  },
  {
    route: AppRoute.about,
    text: 'About us'
  }
];

const Nav: React.FC<NavProps> = ({ className }) => {
  return (
    <nav className={cn(styles['nav'], className)}>
      <ul className={styles['nav__list']}>
        {NAV_LINKS.map(({route, text}) => (
          <li key={route} className={styles['nav__item']}>
            <NavLink
              className={({ isActive }) =>
              `${styles['nav__link']} ${isActive && styles['nav__link--active']}`
              }
              to={route}
            >
              <Text className={styles['nav__text']} tag="span" view="p-18">
                {text}
              </Text>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default React.memo(Nav);
