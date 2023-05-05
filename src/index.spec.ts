import { MutableTuple } from './index';

describe('MutableTuple', () => {
	describe('constructor', () => {
		it('should initialize with no values', () => {
			const tuple = new MutableTuple();

			expect(tuple.length).toBe(0);
			expect(tuple.values).toEqual([]);
		});

		it('should initialize with values', () => {
			const tuple = new MutableTuple(1, 2, 3);

			expect(tuple.length).toBe(3);
			expect(tuple.values).toEqual([1, 2, 3]);
		});
	});

	describe('get', () => {
		it('should return the value at the specified index', () => {
			const tuple = new MutableTuple(1, 2, 3);

			expect(tuple.get(0)).toBe(1);
			expect(tuple.get(1)).toBe(2);
			expect(tuple.get(2)).toBe(3);
		});

		it('should throw an error if the index is out of bounds', () => {
			const tuple = new MutableTuple(1, 2, 3);

			//@ts-ignore
			expect(() => tuple.get(-1)).toThrow();

			//@ts-ignore
			expect(() => tuple.get(3)).toThrow();
		});
	});

	describe('set', () => {
		it('should set the value at the specified index', () => {
			const tuple = new MutableTuple(1, 2, 3);

			tuple.set(0, 4);
			tuple.set(1, 5);
			tuple.set(2, 6);

			expect(tuple.values).toEqual([4, 5, 6]);
		});

		it('should throw an error if the index is out of bounds', () => {
			const tuple = new MutableTuple(1, 2, 3);

			//@ts-ignore
			expect(() => tuple.set(-1, 4)).toThrow();
			//@ts-ignore
			expect(() => tuple.set(3, 4)).toThrow();
		});
	});

	describe('concat', () => {
		it('should concatenate two tuples', () => {
			const tuple1 = new MutableTuple(1, 2);
			const tuple2 = new MutableTuple('a', 'b');
			const tuple3 = tuple1.concat(tuple2);

			expect(tuple3.length).toBe(4);
			expect(tuple3.values).toEqual([1, 2, 'a', 'b']);
		});
	});

	describe('forEach', () => {
		it('should iterate over each value in the tuple', () => {
			const tuple = new MutableTuple(1, 2, 3);
			const values: number[] = [];

			tuple.forEach((value) => {
				values.push(value);
			});

			expect(values).toEqual([1, 2, 3]);
		});
	});

	describe('find', () => {
		it('should return the found value', () => {
			const tuple = new MutableTuple(1, 2, 3);
			const value = tuple.find(2);

			expect(value).toBe(2);
		});

		it('should return NotFound if the value is not found', () => {
			const tuple = new MutableTuple(1, 2, 3);
			const value = tuple.find(4);

			expect(value).toBe(tuple.NotFound);
		});
	});

	describe('findIndex', () => {
		it('should return the index of the found value', () => {
			const tuple = new MutableTuple(1, 2, 3);
			const index = tuple.findIndex(2);

			expect(index).toBe(1);
		});

		it('should return -1 if the value is not found', () => {
			const tuple = new MutableTuple(1, 2, 3);
			const index = tuple.findIndex(4);

			expect(index).toBe(-1);
		});
	});
});
