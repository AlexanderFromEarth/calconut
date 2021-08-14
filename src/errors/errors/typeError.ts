import {CalculationError} from '../classes/error';

/**
 * Internal representation of TypeError
 */
export class CalculationTypeError extends CalculationError {
  /**
   * Create wrapped TypeError
   * @param message Message for error
   */
  public constructor(message: string) {
    super(message, new TypeError(message));
  }
}
