/**
 * Wrapper for result of calculation
 */
export interface Result<T, E> {
  /**
   * Continue calculation if previous was success
   * @param func Function that returns result
   * @returns New result
   */
  then<U>(func: (_: T) => Result<U, E>): Result<U, E>;
}
