import { MutableTuple } from './index';

describe('Mutable Tuple', () => {
	it('creation', () => {
		const tuple = new MutableTuple<[number, string, number]>(1, 'string', 3);
		expect(tuple.values).toEqual([1, 'string', 3]);
	});
});
