import RepositoryBase from "./base/RepositoryBase";
import {User} from "../models/User";
import {IUser} from "../interfaces/models/User";

export default class UserRepository extends RepositoryBase<IUser> {
    constructor() {
        const model = User;
        super(model);
    }
}
