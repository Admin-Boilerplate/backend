import {Types} from "mongoose";

export default class Helpers {

    public static isTrue(val: any): boolean {
        return val && val !== "0" && val !== "false" && val !== "null" && val !== "undefined";
    }

    public static isEmpty(input: any) {
        return (input === undefined || input === null || input === "");
    }

    public static isEmptyObject(obj: any): boolean {
        if (!obj) {
            return true;
        }
        return Object.keys(obj).length === 0;
    }

    /**
     * @description Detects whether or not all the properties of an object are empty
     * @param {any} obj - Target object
     * @return True, if **ALL** the properties are empty
     */
    public static emptyObjectProperties(obj: any): boolean {
        if ([null, undefined].includes(obj)) {
            return true;
        }
        if (Helpers.isTrue(obj)) {
            let empty: boolean[] = [];
            for (const x in obj) {
                empty.push(Helpers.isEmpty(obj[x]));
            }
            // If the number of properties, that are NOT empty, is zero, then the object is marked as empty
            return empty.filter(x => !x).length === 0;
        }
        return false;

    }

    public static toObjectId(_id: any): Types.ObjectId {
        try {
            if (!_id) {
                return _id;
            }
            if (_id instanceof Types.ObjectId) {
                return _id;
            }
            return Types.ObjectId.createFromHexString(_id);
        } catch (e) {
            console.error("toObjectId: ", _id);
            return _id;
        }
    }

    public static isObjectId(_id: string): boolean {
        try {
            if (Types.ObjectId.isValid(_id)) {
                return new Types.ObjectId(_id).toHexString() === _id;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }


    public static toMongoId<T>(_id: T): Types.ObjectId | T {
        try {
            const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
            // @ts-ignore
            if (Types.ObjectId.isValid(_id) && checkForHexRegExp.test(_id)) {
                // @ts-ignore
                return new Types.ObjectId(_id);
            } else {
                return _id;
            }
        } catch (e) {
            return _id;
        }
    }
    /**
     * @description Takes an object, and a property path and returns the value of that property or undefined
     * if property wasn't found
     * @param {string[]|string} p       - The tokenized path of the value to be set. Can contain arrays like: array.2.property
     * @param {any} obj             - The target object or array to be modified
     * @param step                  - The number of loops to start from (Used for recursion, leave empty)
     * @return  The value of the property or undefined
     */
    public static getNestedFieldValue(p: string[] | string, obj: any, step: number = 0) {
        const path = Array.isArray(p) ? p : p.split(".");
        if (step === 0 && path.length === 1) {
            return obj[path[0]];
        }

        let toSend;

        if (path[step].includes("[")) {
            let parts: any = path[step].split("[");
            let key = parts[0];
            let index = parts[1];

            index = parseInt(index.substring(0, index.length - 1), 2);

            if (obj[key]?.[index]) {
                toSend = obj[key][index];
            }

            if (!toSend) {
                return undefined;
            }
        } else {
            try {
                if (!this.isEmptyObject(obj) && typeof obj[path[step]] !== "undefined") {
                    toSend = obj[path[step]];
                } else {
                    toSend = undefined;
                }
            } catch (e) {
                toSend = undefined;
            }
        }

        if (step < path.length - 1) {
            // Recursion
            return this.getNestedFieldValue(path, toSend, ++step);
        } else {
            if (typeof toSend === "undefined") {
                return undefined;
            }
            return toSend;
        }
    }

    /**
     * @description Takes an object, sets the specified property and returns new object, identical to obj other than the set property
     * @param {string} pathString   - The path of the value to be set. Can contain arrays like: array.2.property
     * @param {any} obj             - The target object or array to be modified
     * @param setValue              - The value to be set
     * @param step                  - The number of loops to start from (Used for recursion, leave empty)
     * @param deleteValue           - Whether to delete the property at the specified path
     * @return  A copy of obj with the specified field set to setValue (if found)
     */
    public static setNestedFieldValue(pathString: string, obj: any, setValue: any, step: number = 0, deleteValue: boolean = false) {
        const path = pathString.split(".");
        if (step === path.length - 1 && obj[path[step]] !== undefined) {
            if (!deleteValue) {
                obj[path[step]] = setValue;
            } else {
                delete obj[path[step]];
            }
            return obj;
        }

        if (path[step].includes("[")) {
            let parts: any = path[step].split("[");
            let key = parts[0];
            let index = parts[1];

            index = parseInt(index.substring(0, index.length - 1), 2);

            if (obj[key][index] !== undefined) {
                obj[key][index] = Helpers.setNestedFieldValue(path.join("."), obj[key][index], setValue, ++step, deleteValue);
            }
        } else {
            try {
                if (!Helpers.isEmptyObject(obj) && obj[path[step]] !== undefined) {
                    obj[path[step]] = Helpers.setNestedFieldValue(path.join("."), obj[path[step]], setValue, ++step, deleteValue);
                }
            } catch (e) {
                return obj;
            }
        }
        return obj;
    }

    /**
     * Generates a unique Mongo Id
     */
    public static mongoId(): Types.ObjectId {
        return new Types.ObjectId();
    }

    public static eqId(id1: any, id2: any) {
        return (id1 || "").toString() === (id2 || "").toString();
    }
}
