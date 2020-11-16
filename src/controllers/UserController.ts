import ControllerBase from "../controllers/base/ControllerBase";
import UserRepository from "../repositories/UserRepository";
import {IUser} from "../interfaces/models/User";

export default class UserController extends ControllerBase<IUser> {
    constructor() {
        super(new UserRepository());
    }
}
