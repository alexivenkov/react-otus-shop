export const TOKEN_KEY = 'token';
export const LOCALE_KEY = 'locale';
export const CART_KEY = 'cart';

export const storage = {
  get: (key: string): string => localStorage.getItem(key),
  set: (key: string, value: string): void => localStorage.setItem(key, value),
  clear: (): void => localStorage.clear(),
  remove: (...keys: string[]): void => keys.forEach((key) => localStorage.removeItem(key)),
};
