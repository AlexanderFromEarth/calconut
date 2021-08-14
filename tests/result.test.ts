import {createFailure, createSuccess, isFailure, isSuccess} from '../src/result';

describe('Result', () => {
  const successResult = createSuccess(2);
  const failureResult = createFailure('Test');
  const addTwo = (res: number) => createSuccess(res + 2);

  it('Then success', () => {
    const nextSuccess = successResult.then(addTwo);

    expect(isSuccess(nextSuccess)).toEqual(true);

    if (!isSuccess(nextSuccess)) {
      return;
    }

    expect(nextSuccess.payload).toEqual(4);
  });
  it('Then failure', () => {
    const nextFailure = failureResult.then(addTwo);

    expect(isFailure(nextFailure)).toEqual(true);

    if (!isFailure(nextFailure)) {
      return;
    }

    expect(nextFailure.error).toEqual('Test');
  });
});
