import {compose} from '../src/common/functions/compose';

describe('Compose', () => {
  const addTwo = (num: number) => num + 2;
  const multiplyByTwo = (num: number) => num * 2;

  it('compose(f, g)', () => {
    expect(compose(addTwo, multiplyByTwo)(2)).toEqual(addTwo(multiplyByTwo(2)));
  });
  it('compose(g, f)', () => {
    expect(compose(multiplyByTwo, addTwo)(2)).toEqual(multiplyByTwo(addTwo(2)));
  });
});
