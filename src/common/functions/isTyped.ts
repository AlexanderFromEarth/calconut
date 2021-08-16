/**
 * Check if object is typed
 * @param object Any object
 * @returns True if object is typed object
 */
export const isTyped = (object: object): object is {type: string} => 'type' in object;
