import {curry} from '../src/common/curry';

describe('Curry', () => {
  const sumOfThree = (a: number, b: number, c: number) => a + b + c;
  const curriedSumOfThree = curry(sumOfThree);

  it('f(a)(b)(c)', () => {
    const result = curriedSumOfThree(2)(3)(4);

    expect(result).toEqual(9);
  });
  it('f(a, b, c)', () => {
    const result = curriedSumOfThree(2, 3, 4);

    expect(result).toEqual(9);
  });
});
