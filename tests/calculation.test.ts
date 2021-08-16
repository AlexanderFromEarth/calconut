import {
  Calculation,
  Command,
  createOperation,
  createReturn,
  isOperation,
  isReturn,
} from '../src/calculation';

describe('Calculation', () => {
  class AddTwo<T> implements Command<T> {
    public type: string = 'AddTwo' as const;

    public constructor(public input: number, public next: (output: number) => Calculation<T>) {}
  }
  class MultiplyByTwo<T> implements Command<T> {
    public type: string = 'MultiplyByTwo' as const;

    public constructor(public input: number, public next: (output: number) => Calculation<T>) {}
  }

  const return_ = createReturn(2);
  const operation = createOperation(new AddTwo(2, createReturn));

  it('Modify operation', () => {
    const stringOperation = operation.modify((num) => num.toString());
    expect(isOperation(stringOperation)).toEqual(true);

    if (!isOperation(stringOperation)) {
      return;
    }

    const stringReturn = stringOperation.op.next(stringOperation.op.input + 2);

    expect(isReturn(stringReturn)).toEqual(true);

    if (!isReturn(stringReturn)) {
      return;
    }

    expect(stringReturn.payload).toEqual('4');
  });
  it('Then operation', () => {
    const combinedOperation = operation.then((next) =>
      createOperation(new MultiplyByTwo(next, createReturn))
    );

    expect(isOperation(combinedOperation)).toEqual(true);

    if (!isOperation(combinedOperation)) {
      return;
    }

    const additionResult = combinedOperation.op.next(combinedOperation.op.input + 2);

    expect(isOperation(additionResult)).toEqual(true);

    if (!isOperation(additionResult)) {
      return;
    }

    const multiplicationReturn = additionResult.op.next(additionResult.op.input * 2);

    expect(isReturn(multiplicationReturn)).toEqual(true);

    if (!isReturn(multiplicationReturn)) {
      return;
    }

    expect(multiplicationReturn.payload).toEqual(8);
  });
  it('Modify return', () => {
    const stringReturn = return_.modify((num) => num.toString());

    expect(isReturn(stringReturn)).toEqual(true);

    if (!isReturn(stringReturn)) {
      return;
    }

    expect(stringReturn.payload).toEqual('2');
  });
  it('Then return', () => {
    const combinedReturn = return_.then((next) => createReturn(next * 2));

    expect(isReturn(combinedReturn)).toEqual(true);

    if (!isReturn(combinedReturn)) {
      return;
    }

    expect(combinedReturn.payload).toEqual(4);
  });
});
