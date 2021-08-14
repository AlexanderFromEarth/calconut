import {Command} from '../../calculation';
import {CalculationError, createTypeError} from '../../errors';
import {createFailure, Failure, isSuccess, Result} from '../../result';
import {Interpreter} from '../interfaces/interpreter';

/**
 * Class for compositing many interpreters
 */
export class ComposedInterpreter implements Interpreter {
  /**
   * Create composition of interpreters
   * @param interpreters Interpreters which should be composed
   */
  public constructor(private interpreters: Interpreter[]) {}

  public interpret<T>(command: Command<T>): Result<any, CalculationError> {
    return this._findInterpretation(command) ?? this._makeNotFoundError();
  }

  private _makeNotFoundError(): Failure<CalculationError> {
    return createFailure(createTypeError('Interpretation not found'));
  }

  private _findInterpretation<T>(command: Command<T>): Result<any, CalculationError> | undefined {
    return this._applyInterpreters(command).find(isSuccess);
  }

  private _applyInterpreters<T>(command: Command<T>): Result<any, CalculationError>[] {
    return this.interpreters.map((interpreter) => interpreter.interpret(command));
  }
}
