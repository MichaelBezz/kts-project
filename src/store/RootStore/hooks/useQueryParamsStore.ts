import QueryParamsStore from 'store/RootStore/QueryParamsStore';
import { useRootStore } from 'store/hooks';

export const useQueryParamsStore = (): QueryParamsStore =>
  useRootStore()?.query;
