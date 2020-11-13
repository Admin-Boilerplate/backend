import {Router} from "express";
import AuthController from "../../controllers/AuthController";

const AuthRoutes: Router = Router();
const controller = new AuthController();

AuthRoutes.post("/login", controller.login);
AuthRoutes.post("/register", controller.register);

export default AuthRoutes;
