import {getType} from './getType';

/**
 * Type matching
 * @param pattern Representation of type pattern
 * @returns Function for providing object to pattern matcher for lazing
 */
export const match =
  <T, U>(pattern: {[key: string]: (arg: T) => U}): ((arg: T) => U | undefined) =>
  (arg: T): U | undefined => {
    const fun = pattern[getType(arg).name];

    return fun ? fun(arg) : fun;
  };
