import {Calculation} from '../interfaces/calculation';
import {Command} from '../interfaces/command';

/**
 * Representation for one step of calculation
 */
export class Operation<T> implements Calculation<T> {
  /**
   * Create object that represents one step of calculation
   * @param payload Command that must be interpreted in future
   */
  public constructor(public op: Command<T>) {}

  public then<U>(func: (next: T) => Calculation<U>): Calculation<U> {
    return new Operation(this._recreateOp((output: any) => this.op.next(output).then(func)));
  }

  public modify<U>(func: (next: T) => U): Calculation<U> {
    return new Operation(this._recreateOp((output: any) => this.op.next(output).modify(func)));
  }

  private _recreateOp<U>(func: (_: any) => Calculation<U>): Command<U> {
    return {...this.op, next: func};
  }
}
