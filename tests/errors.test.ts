import {CalculationError, createFailure, createSuccess, Failure, Success} from '../src/errors';

describe('Errors', () => {
  const successResult = createSuccess(2);
  const failureResult = createFailure(new CalculationError('Test', null));
  const addTwo = (res: number) => createSuccess(res + 2);

  it('Then success', () => {
    const nextSuccess = successResult.then(addTwo) as Success<number>;

    expect(nextSuccess.payload).toEqual(4);
  });
  it('Then failure', () => {
    const nextFailure = failureResult.then(addTwo) as Failure<CalculationError>;

    expect(nextFailure.error.message).toEqual('Test');
  });
});
