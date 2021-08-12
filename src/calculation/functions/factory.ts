import {Operation} from '../classes/operation';
import {Return} from '../classes/return';
import {Command} from '../interfaces/command';

/**
 * Factory for Operation
 * @param command Command that must be interpreted in future
 * @returns Operation with provided command
 */
export const createOperation = <T>(command: Command<T>): Operation<T> => new Operation(command);

/**
 * Factory for Return
 * @param payload Data for storing in class
 * @returns End of calculation with provided data
 */
export const createReturn = <T>(payload: T): Return<T> => new Return(payload);
