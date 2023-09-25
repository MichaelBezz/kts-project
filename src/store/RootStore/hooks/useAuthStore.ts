import AuthStore from 'store/RootStore/AuthStore';
import { useRootStore } from 'store/hooks';

export const useAuthStore = (): AuthStore =>
  useRootStore()?.auth;
