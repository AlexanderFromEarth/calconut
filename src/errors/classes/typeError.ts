import {BaseCalculationError} from './baseError';

/**
 * Internal representation of TypeError
 */
export class CalculationTypeError extends BaseCalculationError {
  /**
   * Create wrapped TypeError
   * @param message Message for error
   */
  public constructor(message: string) {
    super(message, new TypeError(message));
  }
}
