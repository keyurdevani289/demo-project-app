import { Cookies } from "react-cookie-consent";

export const isBrowser = (): boolean => typeof window !== "undefined";

export const getCookie = (key: string): string | undefined => {
  if (isBrowser()) {
    return Cookies.get(key);
  }
  return undefined;
};

export const setCookie = (key: string, value: string, options?: object): void => {
  Cookies.set(key, value, options);
};

export const removeCookie = (key: string): void => {
  Cookies.remove(key);
};

