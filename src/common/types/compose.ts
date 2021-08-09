/**
 * Array of unary function type where functions can be applied consistently in reverse order
 */
type ComposeChain<T extends ((arg: any) => any)[]> = {
  [K in keyof T]: K extends number
    ? K extends LastIndex<T>
      ? Last<T>
      : (arg: ReturnType<Popped<T>[K]>) => ReturnType<T[K]>
    : never;
};
