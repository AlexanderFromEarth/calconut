import {ComposedInterpreter} from '../classes/composedInterpreter';
import {Processor} from '../classes/processor';
import {Interpreter} from '../interfaces/interpreter';

/**
 * Factory for creating processor with many interpreter
 * @param interpreter Interpreter that includes in processor
 * @param interpreters Other interpreters that can be composed
 * @returns Processor with provided interpreter
 */
export const createProcessor = (interpreter: Interpreter, ...interpreters: Interpreter[]) =>
  new Processor(
    interpreters.length ? new ComposedInterpreter([interpreter, ...interpreters]) : interpreter
  );
