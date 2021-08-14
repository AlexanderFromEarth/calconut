import {CalculationTypeError} from '../classes/typeError';
import {CalculationError} from '../interfaces/error';

/**
 * Factory for internal TypeError
 * @param message Message for error
 * @returns Wrapped TypeError
 */
export const createTypeError = (message: string): CalculationError =>
  new CalculationTypeError(message);
