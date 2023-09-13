import * as React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';

const ArrowDefaultIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon fill="none" viewBox="0 0 32 32" {...props}>
      <path stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" d="M5.44006 11.88L14.1334 20.5733C15.1601 21.6 16.8401 21.6 17.8667 20.5733L26.5601 11.88"/>
    </Icon>
  );
};

export default React.memo(ArrowDefaultIcon);
