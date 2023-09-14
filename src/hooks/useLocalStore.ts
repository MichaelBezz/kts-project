import * as React from 'react';

export interface ILocalStore {
  destroy(): void;
};

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const container = React.useRef<T | null>(null);

  if (container.current === null) {
    container.current = creator();
  }

  React.useEffect(() => {
    return () => {
      container.current?.destroy();
    };
  }, []);

  return container.current;
};
