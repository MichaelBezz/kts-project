
export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  order: [],
  entities: {}
});

export const normalizeCollection = <K extends string | number, T>(
  items: T[],
  getKeyForItem: (item: T) => K
): CollectionModel<K, T> => {
  const collection: CollectionModel<K, T> = getInitialCollectionModel();

  items.forEach((item) => {
    const id = getKeyForItem(item);

    collection.order.push(id);
    collection.entities[id] = item;
  });

  return collection;
};

export const linearizeCollection = <K extends string | number, T>(
  collection: CollectionModel<K, T>
): T[] => {
  return collection.order.map((id) => collection.entities[id]);
};
