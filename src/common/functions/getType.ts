/**
 * Obtain type (constructor) of object
 * @example
 * ```typescript
 * getType(0); // returns Number
 * getType(false); // returns Boolean
 * getType(''); // returns String
 * getType([]); // returns Array
 * getType({}); // returns Object
 * getType(/./); // returns RegExp
 * ```
 * @param object Some object
 * @returns Constructor of object
 */
export const getType = (
  object: boolean | number | string | {constructor: (new (...args: any[]) => {}) | Function}
): Function | (new (...args: any[]) => {}) => {
  switch (typeof object) {
    case 'boolean':
      return Boolean;
    case 'number':
      return Number;
    case 'string':
      return String;
    case 'object':
      return object.constructor;
  }
};
