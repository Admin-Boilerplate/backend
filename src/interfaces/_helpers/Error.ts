export default interface IError extends Error {
    name: string;
    message: string;
    getMessage?(): string;
    toString?(): string;
    toObject?(): {[key: string]: string};
}

export interface ILogError extends Error {
    function: string;
    class?: string;
    details?: string;
    url?: string;
}
