import {Computation} from '../interfaces/computation';
import {Command} from '../interfaces/command';

/**
 * Representation for one step of calculation
 */
export class Operation<T> implements Computation<T> {
  /**
   * Creates object that represents one step of calculation
   * @param payload Command that must be interpreted in future
   */
  public constructor(public op: Command<T>) {}

  public then<U>(func: (next: T) => Computation<U>): Computation<U> {
    return new Operation(this._recreateOp((output: any) => this.op.next(output).then(func)));
  }

  public modify<U>(func: (next: T) => U): Computation<U> {
    return new Operation(this._recreateOp((output: any) => this.op.next(output).modify(func)));
  }

  private _recreateOp<U>(func: (_: any) => Computation<U>): Command<U> {
    return new (this._makeConstructor(func))();
  }

  private _makeConstructor<U>(
    func: (_: any) => Computation<U>
  ): new (...args: any[]) => Command<U> {
    const opConstructor = this.op.constructor;

    return opConstructor.bind.apply(opConstructor, [null, this.op.input, func]);
  }
}
