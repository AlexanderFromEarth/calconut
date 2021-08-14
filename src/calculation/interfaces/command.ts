import {Calculation} from './calculation';

/**
 * Representation of inner step of calculation process
 */
export interface Command<N> {
  /**
   * Input for getting interpretation
   */
  input: any;
  /**
   * Compute next calculation step
   * @param output Value from interpretation of command
   * @returns Next calculation
   */
  next(output: any): Calculation<N>;
}
