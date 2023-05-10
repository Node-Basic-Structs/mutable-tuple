import { Range } from './types/Range';

export type TupleLength<T extends any[]> = Range<0, T['length']> & number;

export class MutableTuple<T extends any[]> {
	private _values: T;
	private _length: number;

	/**
	 * A symbol representing a value that was not found in the tuple.
	 */
	public NotFound: symbol = Symbol('NotFound');

	/**
	 * Creates a new MutableTuple object.
	 *
	 * @param values - The initial values of the tuple.
	 */
	constructor(...values: T) {
		this._length = values.length;
		this._values = values;
	}

	/**
	 * Gets the values of the tuple.
	 */
	public get values() {
		return this._values;
	}

	/**
	 * Gets the length of the tuple.
	 */
	public get length() {
		return this._length;
	}

	/**
	 * Sets the value of a specific index in the tuple.
	 *
	 * @param index - The index to set the value at.
	 * @param value - The value to set at the index.
	 * @throws {Error} If the index is out of bounds.
	 */
	public set<K extends TupleLength<T>>(index: K, value: T[K]) {
		if (index < 0 || index >= this._length) {
			throw new Error(`Index out of bounds: ${index.toString()}`);
		}

		this._values[index] = value;
	}

	/**
	 * Gets the value of a specific index in the tuple.
	 *
	 * @param index - The index to get the value from.
	 * @returns The value at the specified index.
	 * @throws {Error} If the index is out of bounds.
	 */
	public get<K extends TupleLength<T>>(index: K) {
		if (index < 0 || index >= this._length) {
			throw new Error(`Index out of bounds: ${index.toString()}`);
		}

		return this._values[index];
	}

	/**
	 * Concatenates two tuples.
	 *
	 * @param mutableTuple - The tuple to concatenate with.
	 * @returns A new tuple that is the result of concatenating the two tuples.
	 */
	public concat<P extends any[]>(
		mutableTuple: MutableTuple<P>
	): MutableTuple<[...T, ...P]> {
		return new MutableTuple(...this._values, ...mutableTuple.values);
	}

	/**
	 * Executes a provided function once for each tuple element.
	 *
	 * @param callbackfn - The function to execute on each tuple element.
	 */

	public forEach(callbackfn: (value: T[number], index: number) => void) {
		for (let i = 0; i < this.length; i++) {
			callbackfn(this._values[i], i);
		}
	}

	/**
	 * Searches the mutable tuple for the first element that satisfies the specified callback function.
	 *
	 * @param callbackfn - A function that accepts up to two arguments. The find() method calls the callback function for each element in the mutable tuple until the callback function returns a value which is true.
	 * @returns The value of the first element in the mutable tuple that satisfies the specified callback function, or the NotFound symbol if no element satisfies the callback function.
	 */
	public find(
		callbackfn: (value: T[number], index: number) => boolean
	): T[number] | symbol {
		for (let index in this._values) {
			if (callbackfn(this._values[index], parseInt(index))) {
				return this._values[index];
			}
		}
		return this.NotFound;
	}

	/**
	 * Searches the mutable tuple for the index of the first element that satisfies the specified callback function.
	 *
	 * @param callbackfn - A function that accepts up to two arguments. The findIndex() method calls the callback function for each element in the mutable tuple until the callback function returns a value which is true.
	 * @returns The index of the first element in the mutable tuple that satisfies the specified callback function, or -1 if no element satisfies the callback function.
	 */
	public findIndex(
		callbackfn: (value: T[number], index: number) => boolean
	): TupleLength<T> | -1 {
		for (let index in this._values) {
			if (callbackfn(this._values[index], parseInt(index))) {
				return parseInt(index) as TupleLength<T>;
			}
		}
		return -1;
	}

	/**
	 * Returns an array containing all elements in the mutable tuple that satisfy the specified callback function.
	 *
	 * @param callbackfn - A function that accepts up to two arguments. The filter() method calls the callback function for each element in the mutable tuple and constructs a new array containing all elements that satisfy the callback function.
	 * @returns A new array containing all elements in the mutable tuple that satisfy the specified callback function.
	 */
	public filter(
		callbackfn: (value: T[number], index: number) => boolean
	): Array<T[number]> {
		const values: Array<T[number]> = [];
		for (let index in this._values) {
			if (callbackfn(this._values[index], parseInt(index))) {
				values.push(this._values[index]);
			}
		}
		return values;
	}

	/**
	 * Determines whether the mutable tuple includes a certain value among its entries, returning true or false as appropriate.
	 * @param value - The value to search for.
	 * @returns true if the value is found within the mutable tuple, otherwise false.
	 * @throws {Error} If the index is out of bounds.
	 * @example
	 * const tuple = new MutableTuple(1, 2, 3);
	 * tuple.includes(1); // true
	 * tuple.includes(4); // false
	 */
	includes(value: T[number]): boolean {
		for (let index in this._values) {
			if (this._values[index] === value) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Determines the index of the first occurrence of a given value in the mutable tuple, or returns -1 if it is not present.
	 * @param value - The value to search for.
	 * @returns The index of the value in the mutable tuple, or -1 if not found.
	 * @throws {Error} If the index is out of bounds.
	 * @example
	 * const tuple = new MutableTuple(1, 2, 3);
	 * tuple.indexOf(1); // 0
	 * tuple.indexOf(4); // -1
	 */
	indexOf(value: T[number]): TupleLength<T> | -1 {
		for (let index in this._values) {
			if (this._values[index] === value) {
				return parseInt(index) as TupleLength<T>;
			}
		}
		return -1;
	}

	/**
	 * Determines the index of the last occurrence of a given value in the mutable tuple, or returns -1 if it is not present.
	 * @param value - The value to search for.
	 * @returns The index of the last occurrence of the value in the mutable tuple, or -1 if not found.
	 * @throws {Error} If the index is out of bounds.
	 * @example
	 * const tuple = new MutableTuple(1, 2, 3, 2);
	 * tuple.lastIndexOf(2); // 3
	 * tuple.lastIndexOf(4); // -1
	 */
	lastIndexOf(value: T[number]): TupleLength<T> | -1 {
		for (let index = this._values.length - 1; index >= 0; index--) {
			if (this._values[index] === value) {
				return index as TupleLength<T>;
			}
		}
		return -1;
	}

	/**
	 * Determines whether at least one element in the mutable tuple satisfies the provided testing function.
	 * @param callbackfn - A function that accepts up to three arguments. The some method calls the callbackfn function for each element in the mutable tuple until the callbackfn returns a value which is coercible to the Boolean value true, or until the end of the mutable tuple.
	 * @returns true if the callbackfn function returns a value which is coercible to the Boolean value true for at least one element in the mutable tuple; otherwise, false.
	 * @example
	 * const tuple = new MutableTuple(1, 2, 3);
	 * tuple.some((value) => value > 2); // true
	 * tuple.some((value) => value > 3); // false
	 */
	some(callbackfn: (value: T[number], index: number) => boolean): boolean {
		for (let index in this._values) {
			if (callbackfn(this._values[index], parseInt(index))) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Determines whether all the elements in the mutable tuple pass the test implemented by the provided function, returning a boolean value.
	 * @param callbackfn - A function that accepts up to two arguments. The every method calls the callbackfn function for each element in the mutable tuple until the callbackfn returns a value which is coercible to the Boolean value false, or until the end of the mutable tuple.
	 * @returns true if the callbackfn function returns a truthy value for every mutable tuple element; otherwise, false.
	 * @example
	 * const tuple = new MutableTuple(1, 2, 3);
	 * tuple.every((item) => item > 0); // true
	 * tuple.every((item) => item > 1); // false
	 */
	every(callbackfn: (value: T[number], index: number) => boolean): boolean {
		for (let index in this._values) {
			if (!callbackfn(this._values[index], parseInt(index))) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Applies a function against an accumulator and each element in the mutable tuple (from left to right) to reduce it to a single value.
	 * @param callbackfn - A function that accepts up to three arguments. The reduce method calls the callbackfn function for each element in the mutable tuple.
	 * @param initialValue - If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
	 * @returns The reduced value.
	 * @example
	 * const tuple = new MutableTuple(1, 2, 3);
	 * tuple.reduce((prev, curr) => prev + curr); // 6
	 */
	reduce<K extends T[number]>(
		callbackfn: (
			previousValue: K,
			currentValue: T[number],
			currentIndex: number
		) => K,
		initialValue?: K extends T[number] ? K : any
	): K {
		if (this._values.length === 0) {
			throw new Error('Reduce of empty tuple with no initial value');
		}
		let previousValue = initialValue ?? this._values[0];
		for (
			let index = initialValue ? 0 : 1;
			index < this._values.length;
			index++
		) {
			console.log(previousValue);
			previousValue = callbackfn(previousValue, this._values[index], index);
		}
		return previousValue;
	}
}

const tuple = new MutableTuple(1, 2, 3);

const sum = tuple.reduce(
	(previousValue, currentValue) => previousValue + currentValue
);

console.log(sum);
