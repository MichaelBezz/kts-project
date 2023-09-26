import * as React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';

const CrossIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 20 20" {...props}>
      <path fill="currentColor" d="M17 4.29231L15.7077 3L10 8.70769L4.29231 3L3 4.29231L8.70769 10L3 15.7077L4.29231 17L10 11.2923L15.7077 17L17 15.7077L11.2923 10L17 4.29231Z"/>
    </Icon>
  );
};

export default React.memo(CrossIcon);
