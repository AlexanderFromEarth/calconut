/**
 * Wrapper for errors of calculations
 */
export interface CalculationError extends Error {
	/**
	 * Original error if provided
	 */
  originalError: Error | null;
}
