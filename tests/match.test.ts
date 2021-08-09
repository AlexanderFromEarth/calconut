import {match} from '../src/common/functions/match';

describe('Match', () => {
  it('One type', () => {
    const typeMatch = match({
      Array: (arr) => (arr as number[])[0],
      Object: (obj) => (obj as {value: number}).value,
    });

    expect(typeMatch({value: 2})).toEqual(2);
    expect(typeMatch([2])).toEqual(2);
  });
  it('Two types', () => {
    const typeMatch = match({
      Array: (arr) =>
        match({
          Object: (obj) => (arr as number[])[2]! + (obj as {value: number}).value,
          Array: (arr2) => (arr as number[])[2]! + (arr2 as number[])[1]!,
        }),
      Object: (obj) =>
        match({
          Array: (arr) => (obj as {value: number}).value + (arr as number[])[0]!,
          Object: (obj2) => (obj as {value: number}).value - (obj2 as {value: number}).value,
        }),
    });

    expect(typeMatch([1, 2, 3])!([1, 2, 3])).toEqual(5);
    expect(typeMatch({value: 1})!([1, 2, 3])).toEqual(2);
    expect(typeMatch([1, 2, 3])!({value: 1})).toEqual(4);
    expect(typeMatch({value: 2})!({value: 2})).toEqual(0);
  });
});
