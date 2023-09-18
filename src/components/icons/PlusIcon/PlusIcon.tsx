import * as React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';

const PlusIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 20 20" {...props}>
      <path fill="currentColor" d="M17 9H11V3H9V9H3V11H9V17H11V11H17V9Z"/>
    </Icon>
  );
};

export default React.memo(PlusIcon);
