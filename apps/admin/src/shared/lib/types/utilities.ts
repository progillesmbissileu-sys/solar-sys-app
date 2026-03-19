export type NoExtraProperties<T, U extends T = T> = U & {
  [K in Exclude<keyof U, keyof T>]: never;
};
