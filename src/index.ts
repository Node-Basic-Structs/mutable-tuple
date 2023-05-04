

export class MutableTuple<T extends any[]>{

    private values: T[];
    private maxSize: number;

    constructor(...args: T){
        this.maxSize = args.length;
        this.values = args;
    }

}

const tuple = new MutableTuple<[number, string, number]>(1, "string", 3);


