import {Request, Response} from "express";
import { Document } from "mongoose";
import RepositoryBase from "../../repositories/base/RepositoryBase";
import JsonResponse from "../../helpers/JsonResponse";
import HttpStatusCodes from "http-status-codes";

export default class ControllerBase<T extends Document = any> {

    protected _repository: RepositoryBase<T>;

    constructor(repository: RepositoryBase) {
        this._repository = repository;
    }

    public async paginate(req: Request, res: Response) {
        try {
            const models = await this.repo().paginate(req.query);
            return res.status(HttpStatusCodes.OK).json(models);
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new JsonResponse().exception(err));
        }
    }

    public async all(req: Request, res: Response) {
        try {
            const models = await this.repo().all(req.query);
            return res.status(HttpStatusCodes.OK).json(models);
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new JsonResponse().exception(err));
        }
    }

    public async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const models = await this.repo(req).findById(id, req.query);
            return res.status(HttpStatusCodes.OK).json(models);
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new JsonResponse().exception(err));
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { item } = req.body;
            const models = await this.repo(req).create(item);
            return res.status(HttpStatusCodes.OK).json(models);
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new JsonResponse().exception(err));
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const item = req.body;
            const models = await this.repo(req).update(id, item);
            return res.status(HttpStatusCodes.OK).json(models);
        } catch (err) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new JsonResponse().exception(err));
        }
    }

    protected repo(req?: Request) {
        return this._repository.setLocale(req?.getLocale());
    }
}
