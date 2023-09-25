import AuthStore from 'store/RootStore/AuthStore';
import CartStore from './CartStore';
import QueryParamsStore from './QueryParamsStore';

export default class RootStore {
  readonly auth = new AuthStore();
  readonly cart = new CartStore();
  readonly query = new QueryParamsStore();
}
