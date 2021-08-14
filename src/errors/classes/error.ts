/**
 * Wrapper for errors of calculations
 */
export class CalculationError extends Error {
	/**
	 * Create wrapper error
	 * @param message Text message
	 * @param original Original error if it was catched
	 */
  public constructor(message: string, public original: Error | null) {
		super(message);
	}
}
