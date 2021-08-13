import {Calculation} from '../interfaces/calculation';

/**
 * Representation for end of calculation
 */
export class Return<T> implements Calculation<T> {
  /**
   * Creates object that represents end of calculation
   * @param payload Data for storing in class
   */
  public constructor(public payload: T) {}

  public then<U>(func: (next: T) => Calculation<U>): Calculation<U> {
    return func(this.payload);
  }

  public modify<U>(func: (next: T) => U): Calculation<U> {
    return new Return(func(this.payload));
  }
}
