import { useRootStore } from 'context/RootStoreContext';
import QueryParamsStore from 'store/RootStore/QueryParamsStore';

export const useQueryParamsStore = (): QueryParamsStore =>
  useRootStore()?.query;
