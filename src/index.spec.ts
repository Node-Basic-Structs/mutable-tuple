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

	describe('find()', () => {
		it('should find the first element that satisfies a function', () => {
			const tuple = new MutableTuple(1, 2, 3, 4, 5);
			const found = tuple.find((value) => value > 3);
			expect(found).toBe(4);
		});

		it('should return NotFound if no element satisfies the function', () => {
			const tuple = new MutableTuple(1, 2, 3, 4, 5);
			const found = tuple.find((value) => value > 5);
			expect(found).toBe(tuple.NotFound);
		});
	});

	describe('findIndex()', () => {
		it('should return the index of the first element that satisfies a function', () => {
			const tuple = new MutableTuple(1, 2, 3, 4, 5);
			const foundIndex = tuple.findIndex((value) => value > 3);
			expect(foundIndex).toBe(3);
		});

		it('should return -1 if no element satisfies the function', () => {
			const tuple = new MutableTuple(1, 2, 3, 4, 5);
			const foundIndex = tuple.findIndex((value) => value > 5);
			expect(foundIndex).toBe(-1);
		});
	});

	describe('filter()', () => {
		it('should return an array with the elements that satisfy a function', () => {
			const tuple = new MutableTuple(1, 2, 3, 4, 5);
			const filtered = tuple.filter((value) => value > 3);
			expect(filtered).toEqual([4, 5]);
		});

		it('should return an empty array if no element satisfies the function', () => {
			const tuple = new MutableTuple(1, 2, 3, 4, 5);
			const filtered = tuple.filter((value) => value > 5);
			expect(filtered).toEqual([]);
		});
	});

	describe('includes', () => {
		it('should return true if value exists in tuple', () => {
			const tuple = new MutableTuple(1, '2', true);
			expect(tuple.includes(1)).toBeTruthy();
			expect(tuple.includes('2')).toBeTruthy();
			expect(tuple.includes(true)).toBeTruthy();
		});

		it('should return false if value does not exist in tuple', () => {
			const tuple = new MutableTuple(1, '2', true);
			expect(tuple.includes(0)).toBeFalsy();
			expect(tuple.includes('1')).toBeFalsy();
			expect(tuple.includes(false)).toBeFalsy();
		});
	});

	describe('indexOf', () => {
		it('should return the index of the first occurrence of value in tuple', () => {
			const tuple = new MutableTuple(1, '2', true);
			expect(tuple.indexOf(1)).toBe(0);
			expect(tuple.indexOf('2')).toBe(1);
			expect(tuple.indexOf(true)).toBe(2);
		});

		it('should return -1 if value does not exist in tuple', () => {
			const tuple = new MutableTuple(1, '2', true);
			expect(tuple.indexOf(0)).toBe(-1);
			expect(tuple.indexOf('1')).toBe(-1);
			expect(tuple.indexOf(false)).toBe(-1);
		});
	});

	describe('lastIndexOf', () => {
		it('should return the index of the last occurrence of value in tuple', () => {
			const tuple = new MutableTuple(1, '2', true, '2');
			expect(tuple.lastIndexOf(1)).toBe(0);
			expect(tuple.lastIndexOf('2')).toBe(3);
			expect(tuple.lastIndexOf(true)).toBe(2);
		});

		it('should return -1 if value does not exist in tuple', () => {
			const tuple = new MutableTuple(1, '2', true);
			expect(tuple.lastIndexOf(0)).toBe(-1);
			expect(tuple.lastIndexOf('1')).toBe(-1);
			expect(tuple.lastIndexOf(false)).toBe(-1);
		});
	});

	describe('some', () => {
		it('should return true if at least one value satisfies the condition', () => {
			const tuple = new MutableTuple(1, '2', true);
			expect(
				tuple.some((value: string | number | boolean) => value === 1)
			).toBeTruthy();
			expect(tuple.some((value) => value === '2')).toBeTruthy();
			expect(tuple.some((value) => value === true)).toBeTruthy();
		});

		it('should return false if no value satisfies the condition', () => {
			const tuple = new MutableTuple(1, '2', true);
			expect(tuple.some((value) => value === 0)).toBeFalsy();
			expect(tuple.some((value) => value === '1')).toBeFalsy();
			expect(tuple.some((value) => value === false)).toBeFalsy();
		});
	});

	describe('every', () => {
		it('should return true if all values satisfy the condition', () => {
			const tuple = new MutableTuple(1, 1, 1);
			expect(tuple.every((value) => value === 1)).toBeTruthy();
		});

		it('should return false if at least one value does not satisfy the condition', () => {
			const tuple = new MutableTuple(1, 2, 3);
			expect(tuple.every((value) => value === 1)).toBeFalsy();
		});
	});

	describe('reduce', () => {
		it('should reduce the tuple to a single value', () => {
			const tuple = new MutableTuple(1, 2, 3);

			const sum = tuple.reduce(
				(previousValue, currentValue) => previousValue + currentValue
			);

			expect(sum).toBe(6);
		});

		it('should reduce the tuple to a single value with initial value', () => {
			const tuple = new MutableTuple(1, 2, 3);

			const sum = tuple.reduce(
				(previousValue, currentValue) => previousValue + currentValue,
				10 as number
			);

			expect(sum).toBe(16);
		});

		it('should throw an error if the tuple is empty and no initial value is provided', () => {
			const tuple = new MutableTuple();

			expect(() =>
				tuple.reduce(
					//@ts-ignore
					(previousValue, currentValue) => previousValue + currentValue
				)
			).toThrow();
		});
	});
});
