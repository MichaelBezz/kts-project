export interface IList<T, K extends string | number = number> {
  entities: Record<K, T>;
  keys: K[];
};
