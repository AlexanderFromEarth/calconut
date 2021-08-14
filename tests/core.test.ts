import {Calculation, Command, createOperation, createReturn} from '../src/calculation';
import {match} from '../src/common';
import {createProcessor, Interpreter} from '../src/core';
import {CalculationError, createTypeError} from '../src/errors';
import {createFailure, createSuccess, isFailure, isSuccess, Result} from '../src/result';

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
        })(command) || createFailure(createTypeError('Test'))
      );
    }
  }

  it('Success Process', () => {
    const processor = createProcessor(new CalculatorInterpreter());
    const operation = createOperation(new AddTwo(2, createReturn)).modify(createSuccess);
    const result = processor.process(operation);

    expect(isSuccess(result)).toEqual(true);

    if (!isSuccess(result)) {
      return;
    }

    expect(result.payload).toEqual(4);
  });
  it('Failure Process', () => {
    const processor = createProcessor(new CalculatorInterpreter());
    const operation = createOperation(new AddTwo(2, createReturn))
      .modify(createSuccess)
      .then((arg) => createOperation({input: arg.payload, next: createReturn}));
    const result = processor.process(operation);

    expect(isFailure(result)).toEqual(true);

    if (!isFailure(result)) {
      return;
    }

    expect(result.error.message).toEqual('Test');
  });
});
