/**
 * Check if object is typed
 * @param object Any object
 * @returns True if object is typed object
 */
export const isTyped = (object: any): object is {type: string} => object && 'type' in object;
