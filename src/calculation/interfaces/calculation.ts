/**
 * Representation of calculations
 */
export interface Calculation<T> {
  /**
   * Add next step to calculation
   * @param func Function that returns calculation
   * @returns Calculation with new step
   */
  then<U>(func: (_: T) => Calculation<U>): Calculation<U>;
  /**
   * Modify result of calculation
   * @param func Just function
   * @returns Modified calculation
   */
  modify<U>(func: (_: T) => U): Calculation<U>;
}
