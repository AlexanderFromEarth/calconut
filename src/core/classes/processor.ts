import {Calculation, Operation, Return} from '../../calculation';
import {match} from '../../common';
import {CalculationError} from '../../errors';
import {createSuccess, Result} from '../../result';
import {Interpreter} from './../interfaces/interpreter';

/**
 * Processor that process calculation-objects
 */
export class Processor {
  /**
   * Create processor object
   * @param interpreter Interpreter which would be used for interpreting commands
   */
  public constructor(private interpreter: Interpreter) {}

  /**
   * Handle provided calculation via interpreter
   * @param calculation Calculation for interpretation
   * @returns Result of calculations
   */
  public process<T>(calculation: Calculation<T>): Result<T, CalculationError> {
    return match<Calculation<T>, Result<T, CalculationError>>({
      Operation: (obj) => this._resolveOperation(obj as Operation<T>),
      Return: (obj) => this._resolveReturn(obj as Return<T>),
    })(calculation)!;
  }

  private _resolveReturn<T>(ret: Return<T>): Result<T, CalculationError> {
    return createSuccess(ret.payload);
  }

  private _resolveOperation<T>(operation: Operation<T>): Result<T, CalculationError> {
    return this.interpreter.interpret(operation.op).then((o) => this.process(o));
  }
}
