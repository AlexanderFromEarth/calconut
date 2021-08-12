import {
  Command,
  Computation,
  createOperation,
  createReturn,
  Operation,
  Return,
} from '../src/calculation';

describe('Calculation', () => {
  class AddTwo implements Command<number> {
    public constructor(
      public input: number,
      public next: (output: number) => Computation<number>
    ) {}
  }
  class MultiplyByTwo implements Command<number> {
    public constructor(
      public input: number,
      public next: (output: number) => Computation<number>
    ) {}
  }

  const return_ = createReturn(2);
  const operation = createOperation(new AddTwo(2, (o) => createReturn(o)));

  it('Modify operation', () => {
    const stringOperation = <Operation<string>>operation.modify((num) => num.toString());
    const stringReturn = <Return<string>>stringOperation.op.next(stringOperation.op.input + 2);

    expect(stringReturn.payload).toEqual('4');
  });
  it('Then operation', () => {
    const combinedOperation = <Operation<number>>(
      operation.then((next) => createOperation(new MultiplyByTwo(next, (o) => createReturn(o))))
    );
    const additionResult = <Operation<number>>(
      combinedOperation.op.next(combinedOperation.op.input + 2)
    );
    const multiplicationReturn = <Return<number>>(
      additionResult.op.next(additionResult.op.input * 2)
    );

    expect(multiplicationReturn.payload).toEqual(8);
  });
  it('Modify return', () => {
    const stringReturn = <Return<string>>return_.modify((num) => num.toString());

    expect(stringReturn.payload).toEqual('2');
  });
  it('Then return', () => {
    const combinedReturn = <Return<number>>return_.then((next) => createReturn(next * 2));

    expect(combinedReturn.payload).toEqual(4);
  });
});
