import {Request, Response} from "express";
import * as mongoose from "mongoose";

export default class ControllerBase<T extends mongoose.Document = any> {

    protected model: mongoose.Model<T>;

    constructor(model: mongoose.Model<T>) {
        this.model = model;
    }

    public async retrieve(req: Request, res: Response) {
        try {
            const models = await this.model.paginate();
            if (!models) {
                return res.status(404).send({
                    success: false,
                    message: 'Models not found',
                    data: null
                });
            }

            res.status(200).send({
                success: true,
                data: models
            });

        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    }
}
