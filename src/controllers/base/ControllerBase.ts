import {Request, Response} from "express";
import { Document } from "mongoose";
import RepositoryBase from "../../repositories/base/RepositoryBase";
import JsonResponse from "../../helpers/JsonResponse";

export default class ControllerBase<T extends Document = any> {

    protected repository: RepositoryBase<T>;

    constructor(repository: RepositoryBase) {
        this.repository = repository;
    }

    public async retrieve(req: Request, res: Response) {
        try {
            const models = await this.repository.retrieve();
            return res.json(models);
        } catch (err) {
            res.status(500).json(new JsonResponse().exception(err));
        }
    }
}
