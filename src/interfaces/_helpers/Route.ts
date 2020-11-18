import {IRequest} from "./Request";
import {NextFunction, Response, Router} from "express";
import ControllerBase from "../../controllers/base/ControllerBase";

export interface IRoute {
    verb?: "get"|"post"|"put"|"delete"|"patch"|"head"|"options"|"all";
    path: string;
    method?: string | keyof ControllerBase;
    middleware?: ((req: IRequest, res: Response<any>, next: NextFunction) => Response<any>)[];
    routes?: Router;
}
