describe('Core', () => {
  class AddTwo implements Command<number> {
    public constructor(
      public input: number,
      public next: (output: number) => Calculation<number>
    ) {}
  }
  class CalculatorInterpreter implements Interpreter {
    public interpret<T>(command: Command<T>): Result<number, CalculationError> {
      return (
        match<Command<T>, Result<number, CalculationError>>({
          AddTwo: (arg) => createSuccess(arg.input + 2),
        })(command) || createFailure(new CalculationError('Test', null))
      );
    }
  }

  it('Success Process', () => {
    const processor = createProcessor(new CalculatorInterpreter());
    const operation = createOperation(new AddTwo(2, (output) => createReturn(output))).modify(
      createSuccess
    );
    const result = processor.process(operation) as Success<number>;

    expect(result.payload).toEqual(4);
  });
  it('Failure Process', () => {
    const processor = createProcessor(new CalculatorInterpreter());
    const operation = createOperation(new AddTwo(2, (output) => createReturn(output)))
      .modify(createSuccess)
      .then((arg) => createOperation({input: arg.payload, next: createReturn}));
    const result = processor.process(operation) as Failure<CalculationError>;

    expect(result.error.message).toEqual('Test');
  });
});
