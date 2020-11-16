
import BaseRoutes from "../../routes/api/base/BaseRoutes";
import UserController from "../../controllers/UserController";

export default class UserRoutes extends BaseRoutes {
    constructor() {
        super(new UserController());
    }
}
