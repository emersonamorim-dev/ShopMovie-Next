export type Nil = null | undefined;

export type Maybe<T> = T | Nil;

export type Id = number;


export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


export type AnyFunction = (...args: any) => any;

export type KeyOf<T> = T extends Nil ? never : keyof T;
