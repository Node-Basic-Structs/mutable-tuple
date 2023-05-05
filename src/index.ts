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
}
