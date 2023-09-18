export const getToken = (key: string): string => {
  return localStorage.getItem(key) ?? '';
};

export const saveToken = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const removeToken = (key: string): void => {
  localStorage.removeItem(key);
};
