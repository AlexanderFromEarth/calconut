import {Operation} from '../classes/operation';
import {Return} from '../classes/return';
import {Calculation} from '../interfaces/calculation';

/**
 * Check if calculation is Operation
 * @param calculation Some Calculation object
 * @returns True if calculation is Operation
 */
export const isOperation = <T>(calculation: Calculation<T>): calculation is Operation<T> =>
  calculation instanceof Operation;
/**
 * Check if calculation is Return
 * @param calculation Some Calculation object
 * @returns True if calculation is Return
 */
export const isReturn = <T>(calculation: Calculation<T>): calculation is Return<T> =>
  calculation instanceof Return;
