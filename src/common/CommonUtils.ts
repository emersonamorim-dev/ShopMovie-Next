import { Nil } from './CommonTipos';

export const APP_TITLE = 'ShopMovie';
export const APP_DESCRIPTION = `${APP_TITLE} Loja Virtual FullStack construída com Next e TypeScript`;
export const APP_REPOSITORY_URL = '/buscar';

export const createMockArray = (length: number) => {
  return Array.from(Array(length).keys());
};

export const isNil = (val: unknown): val is Nil => {
  return val === null || val === undefined;
};

export const IS_SERVER = typeof window === 'undefined';
