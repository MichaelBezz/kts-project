
export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  order: [],
  entities: {}
});

export const normalizeCollection = <K extends string | number, T, N>(
  items: T[],
  getKeyForItem: (item: T) => K,
  normalize: (item: T) => N
): CollectionModel<K, N> => {
  const collection: CollectionModel<K, N> = getInitialCollectionModel();

  items.forEach((item) => {
    const id = getKeyForItem(item);

    collection.order.push(id);
    collection.entities[id] = normalize(item);
  });

  return collection;
};

export const linearizeCollection = <K extends string | number, T>(
  collection: CollectionModel<K, T>
): T[] => {
  return collection.order.map((id) => collection.entities[id]);
};
