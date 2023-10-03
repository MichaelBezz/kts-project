import * as React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';

const CheckIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon fill="none" viewBox="0 0 24 24" {...props}>
      <path stroke="currentColor" strokeWidth="2" d="M4 11.6129L9.87755 18L20 7" />
    </Icon>
  );
}

export default React.memo(CheckIcon);
