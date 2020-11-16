import {NextFunction, Response} from "express";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import {IRequest} from "../interfaces/_helpers/Request";
import {IPayload} from "../interfaces/_helpers/Payload";

export default class AuthMiddleware {
    public static autenticate (req: IRequest, res: Response, next: NextFunction) {
        // Get token from header
        const token = req.header("x-auth-token");

        // Check if no token
        if (!token) {
            return res
                .status(HttpStatusCodes.UNAUTHORIZED)
                .json({msg: "No token, authorization denied"});
        }
        // Verify token
        try {
            const payload: IPayload = jwt.verify(token, process.env.JWT_SECRET) as IPayload;
            req.user = payload.user;
            next();
        } catch (err) {
            res
                .status(HttpStatusCodes.UNAUTHORIZED)
                .json({msg: "Token is not valid"});
        }
    }
}
