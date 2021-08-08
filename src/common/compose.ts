/**
 * Compose functions into one according to that rule: compose(f, g)(x) <=> g(f(x))
 * @example
 * ```typescript
 * const f = (x: number) => x + 2;
 * const g = (x: number) => x * 2;
 * compose(f, g)(2) === g(f(2)); // returns 6
 * ```
 * @param funcs Functions that should be composed together
 * @returns Function that represents composition of functions
 */
export const compose =
  <T extends Unary[]>(...funcs: ComposeChain<T>) =>
  (arg: First<Parameters<Last<T>>>): ReturnType<First<T>> =>
    funcs.reduceRight((acc: unknown, cur) => cur(acc), arg);
