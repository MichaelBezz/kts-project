import * as React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';

const MinusIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 20 20" {...props}>
      <path fill="currentColor" d="M3 9V11H17V9H3Z"/>
    </Icon>
  );
};

export default React.memo(MinusIcon);
