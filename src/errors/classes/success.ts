import {Result} from './../interfaces/result';

/**
 * Success representation of calculation
 */
export class Success<T> implements Result<T, unknown> {
  /**
   * Create object that represents calculation success
   * @param payload Success data
   */
  public constructor(public payload: T) {}

  then<U>(func: (_: T) => Result<U, unknown>): Result<U, unknown> {
    return func(this.payload);
  }
}
