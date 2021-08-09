import {getType} from './getType';

/**
 * Type matching
 * @example
 * ```typescript
 * const matcher = match<any, any>({
 *   Number: (numberArg) => <number>numberArg + 2,
 *   String: (stringArg) => `${<string>stringArg} + 2`
 * });
 * matcher(2); // returns 4
 * matcher('2'); // returns '2 + 2'
 * ```
 * @param pattern Representation of type pattern
 * @returns Function for providing object to pattern matcher for lazing
 */
export const match =
  <T, U>(pattern: {[key: string]: (arg: T) => U}): ((arg: T) => U | undefined) =>
  (arg: T): U | undefined => {
    const fun = pattern[getType(arg).name];

    return fun ? fun(arg) : fun;
  };
