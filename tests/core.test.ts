import {Calculation, Command, createOperation, createReturn} from '../src/calculation';
import {match} from '../src/common';
import {createProcessor, Interpreter} from '../src/core';
import {CalculationError, createTypeError} from '../src/errors';
import {createFailure, createSuccess, isFailure, isSuccess, Result} from '../src/result';

describe('Core', () => {
  class AddTwo<T> implements Command<T> {
    public type: string = 'AddTwo' as const;

    public constructor(public input: number, public next: (output: number) => Calculation<T>) {}
  }
  class CalculatorInterpreter implements Interpreter {
    public interpret<T>(command: Command<T>): Result<Calculation<T>, CalculationError> {
      return (
        match<Command<T>, Result<Calculation<T>, CalculationError>>({
          AddTwo: (arg: AddTwo<T>) => createSuccess(arg.next(arg.input + 2)),
        })(command) ?? createFailure(createTypeError('Test'))
      );
    }
  }

  it('Success Process', () => {
    const processor = createProcessor(new CalculatorInterpreter());
    const operation = createOperation(new AddTwo(2, createReturn));
    const result = processor.process(operation);

    expect(isSuccess(result)).toEqual(true);

    if (!isSuccess(result)) {
      return;
    }

    expect(result.payload).toEqual(4);
  });
  it('Failure Process', () => {
    const processor = createProcessor(new CalculatorInterpreter());
    const operation = createOperation(new AddTwo(2, createReturn)).then((arg) =>
      createOperation({type: 'Unknown', input: arg, next: createReturn})
    );
    const result = processor.process(operation);

    expect(isFailure(result)).toEqual(true);

    if (!isFailure(result)) {
      return;
    }

    expect(result.error.message).toEqual('Test');
  });
});
