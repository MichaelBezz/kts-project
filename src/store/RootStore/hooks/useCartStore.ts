import CartStore from 'store/RootStore/CartStore';
import { useRootStore } from 'store/hooks';

export const useCartStore = (): CartStore =>
  useRootStore()?.cart;
