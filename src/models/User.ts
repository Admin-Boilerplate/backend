import {model, Schema} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import IPaginatable from "../interfaces/_helpers/Paginatable";
import {IUser} from "../interfaces/models/User";


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
    avatar: {
        type: String
    }
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

export const User: IPaginatable<IUser> = model<IUser, IPaginatable<IUser>>("User", userSchema);
