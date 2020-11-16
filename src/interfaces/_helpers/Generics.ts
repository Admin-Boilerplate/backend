export type Operator = "eq" | "gt" | "gte" | "lt" | "lte";
export type AssertionStrategy = "and" | "or";

export interface IRange<T> {
    from: T;
    to: T;
}
export interface IDimensions<T = number> {
    width: T;
    height: T;
}

export interface ILimit<T = number> {
    min: T;
    max: T;
}

export interface IDateRange extends IRange<string|Date> {
}

export enum FileTypes {
    PDF = "pdf",
    JPG = "jpg",
    PNG = "png",
    WEBP = "webp",
    XLSX = "xlsx"
}

export enum Sex {
    MALE = "male",
    FEMALE = "female"
}

export enum GenericError {
    Internal = "Internal",
    Unauthorized = "Unauthorized"
}
