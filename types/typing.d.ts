/**
 * Alias for constructor of object
 */
type Constructor = (new (...args: any[]) => {}) | Function;
/**
 * Obtain constructable object
 */
type Constructable = {constructor: Constructor};
