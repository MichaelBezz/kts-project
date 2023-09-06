import cn from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoute } from 'config/routes';
import styles from './Nav.module.scss';

export type NavProps = {
  className?: string;
};

const Nav: React.FC<NavProps> = ({ className }) => {
  return (
    <nav className={cn(styles['nav'], className)}>
      <ul className={styles['nav__list']}>
        <li className={styles['nav__item']}>
          <NavLink className={styles['nav__link']} to={AppRoute.Main}>
            Products
          </NavLink>
        </li>
        <li className={styles['nav__item']}>
          <NavLink className={styles['nav__link']} to="#">
            Categories
          </NavLink>
        </li>
        <li className={styles['nav__item']}>
          <NavLink className={styles['nav__link']} to="#">
            About us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
