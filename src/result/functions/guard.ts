import {Failure} from '../classes/failure';
import {Success} from '../classes/success';
import {Result} from '../interfaces/result';

/**
 * Check if `result` is `Success`
 * @param result Some `Result` object
 * @returns True if `result` is `Success`
 */
export const isSuccess = <T>(result: Result<T, unknown>): result is Success<T> =>
  result instanceof Success;
/**
 * Check if `result` is `Failure`
 * @param result Some `Result` object
 * @returns True if `result` is `Failure`
 */
export const isFailure = <E>(result: Result<unknown, E>): result is Failure<E> =>
  result instanceof Failure;
