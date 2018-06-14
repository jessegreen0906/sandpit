const dynamicGrid = require('../../src/content/dynamic-grid/dynamic-grid');

test('Arrange Grid Elements runs', () => {
	const elements = null;
	const mockMinDimFn = jest.fn(dynamicGrid.jsandpit.gridMinDimension(elements, 'height'));
	dynamicGrid.jsandpit.arrangeGridElements(elements);
	// dynamicGrid.jsandpit.gridMinDimension.get.mockResolvedValue(1);
	// const mockMinGridDimension = jest.fn();
	expect(mockMinDimFn).toBeCalled();
});