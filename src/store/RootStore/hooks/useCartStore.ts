import { useRootStore } from 'context/RootStoreContext';
import CartStore from 'store/RootStore/CartStore';

export const useCartStore = (): CartStore =>
  useRootStore()?.cart;
