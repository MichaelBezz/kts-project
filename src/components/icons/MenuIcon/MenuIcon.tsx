import * as React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';

const MenuIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon fill="none" viewBox="0 0 30 30" {...props}>
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M3.75 8.75H26.25" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M3.75 15H26.25"/>
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M3.75 21.25H26.25"/>
    </Icon>
  );
};

export default React.memo(MenuIcon);
