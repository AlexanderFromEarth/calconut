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
/**
 * Function type with many argument
 */
type Arity = (...args: any[]) => any;
/**
 * Recursively unpack the parameters of function type to curried function type
 */
type CurriedParameters<T extends any[], R> = 0 extends keyof Popped<T>
  ? (arg: First<T>) => CurriedParameters<Popped<T>, R>
  : (arg: First<T>) => R;
/**
 * Obtain the curried return type of function type
 */
type CurriedReturnType<T extends any[], R> = Length<T> extends 1
  ? R
  : First<{[K in keyof T]: CurriedParameters<T, R>}>;
/**
 * Obtain the possible overloads for function type
 */
type CurryOverloads<F extends Arity> = {
  (...args: Parameters<F>): ReturnType<F>;
  (arg: First<Parameters<F>>): CurriedReturnType<Popped<Parameters<F>>, ReturnType<F>>;
};
