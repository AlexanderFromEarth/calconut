import {Computation} from '../interfaces/computation';

/**
 * Representation for end of calculation
 */
export class Return<T> implements Computation<T> {
  /**
   * Creates object that represents end of calculation
   * @param payload Data for storing in class
   */
  public constructor(public payload: T) {}

  public then<U>(func: (next: T) => Computation<U>): Computation<U> {
    return func(this.payload);
  }

  public modify<U>(func: (next: T) => U): Computation<U> {
    return new Return(func(this.payload));
  }
}
