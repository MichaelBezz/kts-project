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
  const [isOpened, setIsOpened] = React.useState<boolean>(false);

  return (
    <header className={cn(
      styles['header'],
      {[styles['is-opened']]: isOpened},
      className
    )}>
      <div className={cn(styles['header__wrapper'], 'container')}>
        <Logo className={styles['header__logo']} />

        <Nav className={styles['header__nav']} />

        <UserNav
          className={styles['header__user-nav']}
          onClick={() => setIsOpened((prevState) => !prevState)}
        />
      </div>
    </header>
  );
};

export default Header;
