/**
 * Representation of calculations
 */
export interface Computation<T> {
  /**
   * Add next step to calculation
   * @param func Function that returns calculation
   * @returns Calculation with new step
   */
  then<U>(func: (_: T) => Computation<U>): Computation<U>;
  /**
   * Modifies result of calculation
   * @param func Just function
   * @returns Modified calculation
   */
  modify<U>(func: (_: T) => U): Computation<U>;
}
