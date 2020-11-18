import {Router} from "express";
import {IRoute} from "../../interfaces/_helpers/Route";
import UserRoutes from "./UserRoutes";
import {Roles} from "../../interfaces/_helpers/AccessControl";
import AuthMiddleware from "../../middleware/AuthMiddleware";
import AuthRoutes from "./AuthRoutes";

export class BaseRoutes {

    public routes: IRoute[] = [
        {
            path: "/users",
            middleware: [
                AuthMiddleware.autenticate,
                AuthMiddleware.hasRole(Roles.Admin)
            ],
            routes: new UserRoutes().routes()
        }
    ];

    constructor() {
    }

    public makeRoutes() {
        const router: Router = Router();

        router.use("/auth", AuthRoutes);

        this.routes.forEach(r => {
            router.use(r.path, r.middleware || [], r.routes);
        });

        return router;
    }
}
