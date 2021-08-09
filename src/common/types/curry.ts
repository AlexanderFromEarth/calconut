/**
 * Obtain the curried version of function type
 */
type Curried<T extends any[], R> = Length<T> extends 1
  ? R
  : First<{[K in keyof T]: Recursive<T, R>}>;

/**
 * Obtain the possible overloads for function type
 */
type CurryOverloads<F extends (...args: any[]) => any> = {
  (...args: Parameters<F>): ReturnType<F>;
  (arg: First<Parameters<F>>): Curried<Popped<Parameters<F>>, ReturnType<F>>;
};
