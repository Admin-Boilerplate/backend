import {model, Schema} from "mongoose";
import IPaginatable from "../interfaces/_helpers/Paginatable";
import {IUser} from "../interfaces/models/User";

import mongoosePaginate from "mongoose-paginate-v2";
import mongooseIntl from "mongoose-intl";


const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        intl: true
    },
    roles: [String]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongooseIntl, {
    languages: ["el", "en"],
    defaultLanguage: "el",
    fallback: "el"
});

export const User: IPaginatable<IUser> = model<IUser, IPaginatable<IUser>>("User", userSchema);
