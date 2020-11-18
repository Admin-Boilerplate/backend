import UserController from "../../controllers/UserController";
import RouteBase from "./base/RouteBase";

export default class UserRoutes extends RouteBase {
    constructor() {
        super(new UserController());
    }
}
