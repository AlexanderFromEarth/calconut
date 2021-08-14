import {CalculationError} from '../interfaces/error';

/**
 * Wrapper for errors of calculations
 */
export class BaseCalculationError extends Error implements CalculationError {
	/**
	 * Create wrapper error
	 * @param message Text message
	 * @param originalError Original error if it was catched
	 */
  public constructor(message: string, public originalError: Error | null) {
    super(message);
  }
}
