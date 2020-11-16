import { Request } from "express";
import {IPayload} from "./Payload";

export interface IRequest extends Request, IPayload {

}
