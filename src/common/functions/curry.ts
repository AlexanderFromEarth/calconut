/**
 * Curry provided function with possibility of using as normal function
 * @example
 * ```typescript
 * const sum = (a: number, b: number) => a + b;
 * const curried = curry(sum);
 * curried(1, 1) === sum(1, 1); // returns 2
 * curried(1)(1) === sum(1, 1); // returns 2
 * ```
 * @param func Function that should be curried
 * @return Curried version of function
 */
export const curry = <F extends (...args: any[]) => any>(func: F): CurryOverloads<F> => {
  const readParameters =
    (current: unknown[]): CurryOverloads<F> =>
    (...passed: unknown[]) => {
      const result = [...current, ...passed].filter((_, idx) => idx < func.length);

      return result.length === func.length ? func(...result) : readParameters(result);
    };

  return readParameters([]);
};
