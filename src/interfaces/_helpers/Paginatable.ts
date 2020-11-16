import "mongoose-paginate-v2";
import { Document, PaginateModel, Aggregate } from "mongoose";
export default interface IPaginatable<T extends Document> extends PaginateModel<T> {
}
