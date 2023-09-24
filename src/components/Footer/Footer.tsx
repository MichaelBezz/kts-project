import cn from 'classnames';
import * as React from 'react';
import Logo from 'components/Logo';
import Text from 'components/Text';
import styles from './Footer.module.scss';

export type FooterProps = {
  className?: string;
};

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <div className={cn(styles['footer'], className)}>
      <div className={cn(styles['footer__wrapper'], 'container')}>
        <Logo className={styles['footer__logo']} />

        <Text tag="p" view="p-18" weight="bold" color="accent">
          2023
        </Text>
      </div>
    </div>
  );
};

export default Footer;
