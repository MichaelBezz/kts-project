import * as React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';

const ArrowRightIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon fill="none" viewBox="0 0 32 32" {...props}>
      <path stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" d="M11.88 26.5599L20.5733 17.8666C21.6 16.8399 21.6 15.1599 20.5733 14.1333L11.88 5.43994"/>
    </Icon>
  );
};

export default React.memo(ArrowRightIcon);
