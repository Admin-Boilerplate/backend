import {Document, Model, PaginateModel} from "mongoose";
import JsonResponse from "../../helpers/JsonResponse";
import {IUser} from "../../interfaces/models/User";

export default class RepositoryBase<T extends Document = any> {
    protected model: Model<T> & PaginateModel<T>;
    protected user: IUser;

    constructor(model: Model<T> & PaginateModel<T>) {
        this.model = model;
    }

    public async retrieve() {
        return new JsonResponse().ok(await this.model.paginate());
    }

    public async findById(id: string) {
        return new JsonResponse().ok(await this.model.findById(id));
    }

    public async create(item: Partial<T>) {
        return new JsonResponse().ok(await new this.model(item).save());
    }

    public async update(id: string, item: Partial<T>) {
        return new JsonResponse().ok(await this.model.findByIdAndUpdate(id, item, {new: true}));
    }
}
