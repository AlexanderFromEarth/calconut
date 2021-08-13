import {Failure} from '../classes/failure';
import {Success} from '../classes/success';

/**
 * Factory for success
 * @param payload Just data for success calculation
 * @returns Success with provided data
 */
export const createSuccess = <T>(payload: T) => new Success(payload);
/**
 * Factory for failure
 * @param error Representation of error
 * @returns Failure with provided error
 */
export const createFailure = <E>(error: E) => new Failure(error);
