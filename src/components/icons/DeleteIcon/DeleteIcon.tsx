import * as React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';

const DeleteIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 20 20" {...props}>
      <path fill="currentColor" d="M17.3 4.3H2.6C2.3 4.3 2 4.5 2 4.8C2 5.1 2.3 5.4 2.6 5.4H4.3V17.4C4.3 17.7 4.6 18 4.9 18H15.1C15.4 18 15.7 17.7 15.7 17.4V5.4H17.4C17.7 5.4 18 5.1 18 4.8C18 4.5 17.6 4.3 17.3 4.3ZM14.5 16.8H5.4V5.4H14.5V16.8Z"/>
      <path fill="currentColor" d="M8.2 3.2H11.6C11.9 3.2 12.2 2.9 12.2 2.6C12.2 2.3 12 2 11.7 2H8.2C7.9 2 7.7 2.3 7.7 2.6C7.7 2.9 7.9 3.2 8.2 3.2Z"/>
      <path fill="currentColor" d="M8.2 14C8.5 14 8.8 13.7 8.8 13.4V7.7C8.8 7.4 8.5 7.1 8.2 7.1C7.9 7.1 7.6 7.4 7.6 7.7V13.4C7.7 13.7 7.9 14 8.2 14Z"/>
      <path fill="currentColor" d="M11.7 14C12 14 12.3 13.7 12.3 13.4V7.7C12.3 7.4 12 7.1 11.7 7.1C11.4 7.1 11.1 7.5 11.1 7.7V13.4C11.1 13.7 11.3 14 11.7 14Z"/>
    </Icon>
  );
};

export default React.memo(DeleteIcon);
