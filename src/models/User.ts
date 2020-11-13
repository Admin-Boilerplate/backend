import {Document, Model, model, Schema} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param avatar:string
 */
export interface IUser extends Document {
    email: string;
    password: string;
    avatar: string;
}


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
const User: Model<IUser> = model("User", userSchema);

export default User;
