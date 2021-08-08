describe('GetType', () => {
  const array = [1, 2, 3];
  const object = {num: 1};

  it('Array', () => {
    expect(getType(array)).toEqual(Array);
  });
  it('Object', () => {
    expect(getType(object)).toEqual(Object);
  });
});
