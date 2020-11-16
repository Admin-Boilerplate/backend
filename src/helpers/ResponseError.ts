import IError from "../interfaces/_helpers/Error";

export default class ResponseError implements IError {

    public readonly name: string;
    public readonly message: string;
    public readonly details: any;

    constructor(name: string, msg: string, details?: any) {
        this.name = name;
        this.message = msg;
        if (details)
            this.details = details;
    }

    public static fromError(e: Error) {
        let stack: string[];
        if (e.stack) {
            stack = e.stack.split("\n");
        }
        return new ResponseError(e.name, e.message, stack);
    }

    public getMessage() {
        return this.message;
    }

    public toString(): string {
        return `${this.name}: ${this.message}`;
    }

    public toObject() {
        let error: {[key: string]: string} = {};
        error[this.name] = this.message;
        return error;
    }
}
