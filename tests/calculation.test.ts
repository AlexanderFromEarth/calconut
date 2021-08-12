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
    const stringOperation = operation.modify((num) => num.toString()) as Operation<string>;
    const stringReturn = stringOperation.op.next(stringOperation.op.input + 2) as Return<string>;

    expect(stringReturn.payload).toEqual('4');
  });
  it('Then operation', () => {
    const combinedOperation = operation.then((next) =>
      createOperation(new MultiplyByTwo(next, (o) => createReturn(o)))
    ) as Operation<number>;
    const additionResult = combinedOperation.op.next(
      combinedOperation.op.input + 2
    ) as Operation<number>;
    const multiplicationReturn = additionResult.op.next(
      additionResult.op.input * 2
    ) as Return<number>;

    expect(multiplicationReturn.payload).toEqual(8);
  });
  it('Modify return', () => {
    const stringReturn = return_.modify((num) => num.toString()) as Return<string>;

    expect(stringReturn.payload).toEqual('2');
  });
  it('Then return', () => {
    const combinedReturn = return_.then((next) =>
      createReturn(next * 2)
    ) as Return<number>;

    expect(combinedReturn.payload).toEqual(4);
  });
});
