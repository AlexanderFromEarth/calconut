import {Result} from './../interfaces/result';

/**
 * Failure representation of calculation
 */
export class Failure<E> implements Result<any, E> {
  /**
   * Create object that represents calculation failure
   * @param error Representation of error
   */
  public constructor(public error: E) {}

  then<U>(_: (_: any) => Result<U, E>): Result<U, E> {
    return this;
  }
}

