import cn from 'classnames';
import * as React from 'react';
import Logo from 'components/Logo';
import Nav from 'components/Nav';
import UserNav from 'components/UserNav';
import styles from './Header.module.scss';

export type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(styles['header'], className)}>
      <div className="container">
        <Logo className={styles['header__logo']} />
        <Nav className={styles['header__nav']} />
        <UserNav className={styles['header__user-nav']} />
      </div>
    </header>
  );
};

export default Header;
