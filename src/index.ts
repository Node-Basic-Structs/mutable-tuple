import { Range } from './types/Range';

type TupleLength<T extends any[]> = Range<0, T['length']> & number;

export class MutableTuple<T extends any[]> {
	private _values: T[];
	private _maxSize: number;

	constructor(...args: T) {
		this._maxSize = args.length;
		this._values = args;
	}

	public get values() {
		return this._values;
	}

	public set<K extends TupleLength<T>>(index: K, value: T[K]) {
		if (index in this._values) {
			this._values[index as number] = value;
		} else {
			throw new Error(`Index out of bounds: ${index.toString()}`);
		}
	}

	public get<K extends TupleLength<T>>(index: K) {
		if (index in this._values) {
			console.log(typeof this._values[index as number]);
			return this._values[index as number];
		} else {
			throw new Error(`Index out of bounds: ${index.toString()}`);
		}
	}

	public test<K extends number>(index: K) {
		const numericIndex = index as unknown as number;
		if (numericIndex >= 0 && numericIndex < this._values.length) {
			console.log(numericIndex);
		} else {
			throw new Error(`Index out of bounds: ${numericIndex}`);
		}
	}
}

const tuple = new MutableTuple<[number, string, number]>(1, 'string', 3);

console.log(tuple.values);
tuple.set(1, 'asdfads');
console.log(tuple.get(1));
console.log(tuple.values);
