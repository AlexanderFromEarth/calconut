import {getType} from '../src/common/functions/getType';

describe('GetType', () => {
  it('Number', () => {
    expect(getType(0)).toEqual(Number);
  });
  it('Boolean', () => {
    expect(getType(false)).toEqual(Boolean);
  });
  it('String', () => {
    expect(getType('')).toEqual(String);
  });
  it('Array', () => {
    expect(getType([])).toEqual(Array);
  });
  it('Object', () => {
    expect(getType({})).toEqual(Object);
  });
  it('Complex object (RegExp)', () => {
    expect(getType(/.*/)).toEqual(RegExp);
  });
});
