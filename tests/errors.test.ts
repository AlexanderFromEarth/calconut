import {
  CalculationError,
  createFailure,
  createSuccess,
  Failure,
  isFailure,
  isSuccess,
  Success,
} from '../src/errors';

describe('Errors', () => {
  const successResult = createSuccess(2);
  const failureResult = createFailure(new CalculationError('Test', null));
  const addTwo = (res: number) => createSuccess(res + 2);

  it('Then success', () => {
    const nextSuccess = <Success<number>>successResult.then(addTwo);

    expect(isSuccess(nextSuccess)).toEqual(true);
    expect(nextSuccess.payload).toEqual(4);
  });
  it('Then failure', () => {
    const nextFailure = <Failure<CalculationError>>failureResult.then(addTwo);

    expect(isFailure(nextFailure)).toEqual(true);
    expect(nextFailure.error.message).toEqual('Test');
  });
});
