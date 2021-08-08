/**
 * Function type with one argument
 */
type Unary = (arg: any) => any;
/**
 * Array of unary function type where functions can be applied consistently in reverse order
 */
type ComposeChain<T extends Unary[]> = {
  [K in keyof T]: K extends number
    ? K extends LastIndex<T>
      ? Last<T>
      : (arg: ReturnType<Popped<T>[K]>) => ReturnType<T[K]>
    : never;
};
