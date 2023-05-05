import { Range } from './types/Range';

type TupleLength<T extends any[]> = Range<0, T['length']> & number;

export class MutableTuple<T extends any[]> {
	private _values: T;
	private _length: number;
	public NotFound: symbol = Symbol('NotFound');

	constructor(...values: T) {
		this._length = values.length;
		this._values = values;
	}

	public get values() {
		return this._values;
	}

	public get length() {
		return this._length;
	}

	public set<K extends TupleLength<T>>(index: K, value: T[K]) {
		if (index < 0 || index >= this._length) {
			throw new Error(`Index out of bounds: ${index.toString()}`);
		}

		this._values[index] = value;
	}

	public get<K extends TupleLength<T>>(index: K) {
		if (index < 0 || index >= this._length) {
			throw new Error(`Index out of bounds: ${index.toString()}`);
		}

		return this._values[index];
	}

	public concat<P extends any[]>(
		mutableTuple: MutableTuple<P>
	): MutableTuple<[...T, ...P]> {
		return new MutableTuple(...this._values, ...mutableTuple.values);
	}

	public forEach(callbackfn: (value: T[number], index: number) => void) {
		for (let i = 0; i < this.length; i++) {
			callbackfn(this._values[i], i);
		}
	}

	public find(value: T[number]): T[number] | symbol {
		for (let item of this._values) {
			if (item === value) {
				return item;
			}
		}
		return this.NotFound;
	}

	public findIndex(value: T[number]): TupleLength<T> | -1 {
		for (let index in this._values) {
			if (this._values[index] === value) {
				return parseInt(index) as TupleLength<T>;
			}
		}
		return -1;
	}
}
