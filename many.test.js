test.each(Array.from({ length: 3000 }, (_, i) => i))('test %i', () => {
  expect(true).toBe(true);
});
