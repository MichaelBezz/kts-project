import * as React from 'react';
import rootStore, { RootStore } from 'store/RootStore';

export const RootStoreContext = React.createContext<RootStore>(rootStore);

export const useRootStore = (): RootStore =>
  React.useContext(RootStoreContext);
