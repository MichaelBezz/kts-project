import cn from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import CartButton from 'components/CartButton';
import MenuIcon from 'components/icons/MenuIcon';
import UserIcon from 'components/icons/UserIcon';
import { AppRoute } from 'config/app-route';
import styles from './UserNav.module.scss';

export type UserNavProps = {
  className?: string;
  onClick?: () => void;
};

const UserNav: React.FC<UserNavProps> = ({ className, onClick }) => {
  return (
    <div className={cn(styles['user-nav'], className)}>
      <ul className={styles['user-nav__list']}>
        <li className={styles['user-nav__item']}>
          <CartButton />
        </li>
        <li className={styles['user-nav__item']}>
          <Link className={styles['user-nav__link']} to={AppRoute.login} aria-label="Account">
            <UserIcon className={styles['user-nav__icon']} width={30} height={30} />
          </Link>
        </li>
        <li className={cn(styles['user-nav__item'], styles['user-nav__item--burger'])}>
          <button
            className={cn(styles['user-nav__link'], styles['user-nav__burger'])}
            type="button"
            aria-label="Toggle menu"
            onClick={onClick}
          >
            <MenuIcon className={styles['user-nav__icon']} width={30} height={30} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(UserNav);
