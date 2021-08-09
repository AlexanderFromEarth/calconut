/**
 * Obtain the length of array type
 */
type Length<T extends any[]> = T extends {length: infer L} ? L : never;

/**
 * Obtain the array without first element of array type
 */
type Popped<T extends any[]> = T extends [_: any, ...rest: infer U] ? U : T;

/**
 * Obtain last index of a array type
 */
type LastIndex<T extends any[]> = Length<Popped<T>>;

/**
 * Obtain the first type of a array type
 */
type First<T extends any[]> = T[0];

/**
 * Obtain the last type of a array type
 */
type Last<T extends any[]> = T[LastIndex<T>];

/**
 * Recursively unpack the array
 */
type Recursive<T extends any[], R> = 0 extends keyof Popped<T>
  ? (arg: First<T>) => Recursive<Popped<T>, R>
  : (arg: First<T>) => R;
