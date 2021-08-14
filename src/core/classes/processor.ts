import {Calculation, Operation, Return} from '../../calculation';
import {match} from '../../common';
import {CalculationError} from '../../errors';
import {Result} from '../../result';
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
  public process<T>(
    calculation: Calculation<Result<T, CalculationError>>
  ): Result<T, CalculationError> {
    return match<Calculation<Result<T, CalculationError>>, Result<T, CalculationError>>({
      Operation: (obj) => this._resolveOperation(obj as Operation<Result<T, CalculationError>>),
      Return: (obj) => this._resolveReturn(obj as Return<Result<T, CalculationError>>),
    })(calculation)!;
  }

  private _resolveReturn<T>(ret: Return<Result<T, CalculationError>>): Result<T, CalculationError> {
    return ret.payload;
  }

  private _resolveOperation<T>(
    operation: Operation<Result<T, CalculationError>>
  ): Result<T, CalculationError> {
    return this.interpreter
      .interpret(operation.op)
      .then((value) => this.process(operation.op.next(value)));
  }
}
