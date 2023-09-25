import * as React from 'react';
import UserStore from 'store/UserStore';

export const UserStoreContext = React.createContext<UserStore | null>(null);

export const useUserStore = (): UserStore => {
  const context = React.useContext(UserStoreContext);

  if (context === null) {
    throw new Error('Check UserStore');
  }

  return context;
};
