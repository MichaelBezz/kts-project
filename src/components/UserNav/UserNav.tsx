import cn from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from 'components/icons/CartIcon';
import UserIcon from 'components/icons/UserIcon';
import styles from './UserNav.module.scss';

export type UserNavProps = {
  className?: string;
};

const UserNav: React.FC<UserNavProps> = ({ className }) => {
  return (
    <div className={cn(styles['user-nav'], className)}>
      <ul className={styles['user-nav__list']}>
        <li className={styles['user-nav__item']}>
          <Link className={styles['user-nav__link']} to="#" aria-label="Cart">
            <CartIcon width={30} height={30} />
          </Link>
        </li>
        <li className={styles['user-nav__item']}>
          <Link className={styles['user-nav__link']} to="#" aria-label="Account">
            <UserIcon width={30} height={30} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserNav;
