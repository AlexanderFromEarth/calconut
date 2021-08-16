import {isTyped} from '../src/common';

describe('IsTyped', () => {
  it('Typed', () => {
    expect(isTyped({type: 'TypedObject'})).toEqual(true);
  });
  it('Not Typed', () => {
    expect(isTyped({value: 1})).toEqual(false);
  });
});
