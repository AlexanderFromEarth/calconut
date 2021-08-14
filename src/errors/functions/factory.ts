import {CalculationError} from './../classes/error';
import {Failure} from '../classes/failure';
import {Success} from '../classes/success';
import {CalculationTypeError} from '../errors/typeError';

/**
 * Factory for success
 * @param payload Just data for success calculation
 * @returns Success with provided data
 */
export const createSuccess = <T>(payload: T): Success<T> => new Success(payload);
/**
 * Factory for failure
 * @param error Representation of error
 * @returns Failure with provided error
 */
export const createFailure = <E>(error: E): Failure<E> => new Failure(error);
/**
 * Factory for internal TypeError
 * @param message Message for error
 * @returns Wrapped TypeError
 */
export const createTypeError = (message: string): CalculationError =>
  new CalculationTypeError(message);
