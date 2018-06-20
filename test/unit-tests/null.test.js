const nullFile = require('../../src/content/null');
test('Expect null', () => {
	expect(nullFile.noll).toEqual(null);
	expect(nullFile.noll2).toEqual(null);
});