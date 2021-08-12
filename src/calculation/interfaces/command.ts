import {Computation} from './computation';

/**
 * Representation of inner step of calculation process
 */
export interface Command<N> {
  /**
   * Input for getting interpretation
   */
  input: any;
  /**
   * Computes next calculation step
   * @param output Value from interpretation of command
   * @returns Next calculation
   */
  next(output: any): Computation<N>;
}
