import {Command} from '../../calculation';
import {CalculationError} from '../../errors';
import {Result} from '../../result';

/**
 * Interpreter that interprets command-objects.
 */
export interface Interpreter {
  /**
   * Interpret provided command over all registered interpreters.
   * @param command Command which should be interpreted.
   * @returns Interpretation of command or undefined if not found.
   */
  interpret: <T>(command: Command<T>) => Result<any, CalculationError>;
}
