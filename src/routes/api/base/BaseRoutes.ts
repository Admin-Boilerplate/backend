import ControllerBase from "../../../controllers/base/ControllerBase";
import {Router} from "express";

export default class BaseRoutes {
    protected controller: ControllerBase;
    protected extraRoutes: {verb: string, path: string, method: string}[] = [];

    constructor(controller: ControllerBase) {
        this.controller = controller;
    }

    public routes() {
        const router = Router()
            .get("/paginate", this.controller.retrieve.bind(this.controller));

        if (this.extraRoutes?.length) {
            this.extraRoutes.forEach(er => {
                router?.[er.verb](er.path, this.controller[er.method].bind(this.controller));
            })
        }

        return router;
    }


}
