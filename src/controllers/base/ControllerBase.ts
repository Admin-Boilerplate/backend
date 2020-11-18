import {Request, Response} from "express";
import { Document } from "mongoose";
import RepositoryBase from "../../repositories/base/RepositoryBase";
import JsonResponse from "../../helpers/JsonResponse";
import HttpStatusCodes from "http-status-codes";

export default class ControllerBase<T extends Document = any> {

    protected repository: RepositoryBase<T>;

    constructor(repository: RepositoryBase) {
        this.repository = repository;
    }

    public async retrieve(req: Request, res: Response) {
        try {
            const models = await this.repository.retrieve();
            return res.status(HttpStatusCodes.OK).json(models);
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new JsonResponse().exception(err));
        }
    }

    public async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const models = await this.repository.findById(id);
            return res.status(HttpStatusCodes.OK).json(models);
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new JsonResponse().exception(err));
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { item } = req.body;
            const models = await this.repository.create(item);
            return res.status(HttpStatusCodes.OK).json(models);
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new JsonResponse().exception(err));
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const item = req.body;
            const models = await this.repository.update(id, item);
            return res.status(HttpStatusCodes.OK).json(models);
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new JsonResponse().exception(err));
        }
    }
}
