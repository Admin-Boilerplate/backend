import User, { IUser } from "../models/User";
import ControllerBase from "../controllers/base/ControllerBase";

export default class UserController extends ControllerBase<IUser> {

    constructor() {
        const model = User;
        super(model);
    }
}
