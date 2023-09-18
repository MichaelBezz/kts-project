import cn from 'classnames';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from 'components/Logo';
import Nav from 'components/Nav';
import UserNav from 'components/UserNav';
import styles from './Header.module.scss';

export type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const location = useLocation();

  React.useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handelBurgerClick = React.useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <header className={cn(
      styles['header'],
      {[styles['is-open']]: isOpen},
      className
    )}>
      <div className={cn(styles['header__wrapper'], 'container')}>
        <Logo className={styles['header__logo']} />

        <Nav className={styles['header__nav']} />

        <UserNav
          className={styles['header__user-nav']}
          onClick={handelBurgerClick}
        />
      </div>
    </header>
  );
};

export default React.memo(Header);
