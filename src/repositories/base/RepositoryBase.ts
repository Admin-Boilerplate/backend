import {Document, Model, PaginateModel} from "mongoose";
import JsonResponse from "../../helpers/JsonResponse";
import {IUser} from "../../interfaces/models/User";
import {localeOptions} from "../../i18n/locale";

export default class RepositoryBase<T extends Document = any> {
    protected model: Model<T> & PaginateModel<T>;
    protected user: IUser;

    protected locale: string;

    constructor(model: Model<T> & PaginateModel<T>) {
        this.model = model;
    }

    public async retrieve(query: any = {}) {
        return new JsonResponse().ok(await this.model.paginate({}, query));
    }

    public async findById(id: string, query: any = {}) {
        return new JsonResponse().ok(await this.model.findById(id, {}, query));
    }

    public async create(item: Partial<T>) {
        return new JsonResponse().ok(await new this.model(item).save());
    }

    public async update(id: string, item: Partial<T>) {
        return new JsonResponse().ok(await this.model.findByIdAndUpdate(id, item, {new: true}));
    }

    public setLocale(locale: string) {
        this.locale = locale || localeOptions.defaultLocale;
        return this;
    }
}
