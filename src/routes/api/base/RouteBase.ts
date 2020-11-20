import ControllerBase from "../../../controllers/base/ControllerBase";
import {Router} from "express";
import {IRoute} from "../../../interfaces/_helpers/Route";

export default class RouteBase {
    protected controller: ControllerBase;

    protected extraRoutes: IRoute[] = [];
    protected baseRoutes: IRoute[] = [
        {
            verb: "get",
            path: "/",
            method: "all"
        },
        {
            verb: "get",
            path: "/paginate",
            method: "paginate"
        },
        {
            path: "/",
            method: "create",
            verb: "post"
        },
        {
            verb: "put",
            path: "/:id",
            method: "update"
        },
        {
            verb: "get",
            path: "/:id",
            method: "findById"
        },
    ];

    constructor(controller: ControllerBase) {
        this.controller = controller;
    }

    public routes() {
        const router: Router = Router();

        if (this.extraRoutes?.length) {
            this.extraRoutes.forEach(er => {
                router[er.verb](er.path, er.middleware || [], this.controller[er.method].bind(this.controller));
            })
        }

        this.baseRoutes.forEach(br => {
            router[br.verb](br.path, br.middleware || [], this.controller[br.method].bind(this.controller));
        });

        return router;
    }
}
