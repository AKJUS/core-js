QUnit.test('Number#clamp', assert => {
  const { clamp } = Number.prototype;
  assert.isFunction(clamp);
  assert.name(clamp, 'clamp');
  assert.arity(clamp, 2);
  assert.looksNative(clamp);
  assert.nonEnumerable(Number.prototype, 'clamp');

  assert.same(clamp.call(2, 4, 6), 4);
  assert.same(clamp.call(4, 2, 6), 4);
  assert.same(clamp.call(6, 2, 4), 4);

  assert.same(clamp.call(-0, 0, 1), 0, 'If value is -0𝔽 and min is +0𝔽, return +0𝔽.');
  assert.same(clamp.call(0, -0, 1), 0, 'If value is +0𝔽 and min is -0𝔽, return +0𝔽.');
  assert.same(clamp.call(-0, -1, 0), -0, 'If value is -0𝔽 and max is +0𝔽, return -0𝔽.');
  assert.same(clamp.call(0, -1, -0), -0, 'If value is +0𝔽 and max is -0𝔽, return -0𝔽.');
  assert.same(clamp.call(0, -0, -0), -0, 'If min = max return min.');

  assert.same(clamp.call(2, 0, -0), -0, 'min is +0𝔽 and max is -0𝔽');
  assert.same(clamp.call(2, 3, 1), 1, 'min > max');

  assert.same(clamp.call(NaN, 3, 1), NaN, 'If value is NaN, return NaN.');
  assert.same(clamp.call(2, NaN, 1), NaN, 'If min is NaN, return NaN.');
  assert.same(clamp.call(2, 3, NaN), NaN, 'If max is NaN, return NaN.');

  assert.throws(() => clamp.call({ valueOf: () => 2 }, 1, 3), TypeError, 'If value is not a Number, throw a TypeError exception');
  assert.throws(() => clamp.call(2, Object(1), 3), TypeError, 'If min is not a Number, throw a TypeError exception.');
  assert.throws(() => clamp.call(2, 1, Object(3)), TypeError, 'If max is not a Number, throw a TypeError exception.');
});
