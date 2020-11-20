import {NextFunction, Response} from "express";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import {IRequest} from "../interfaces/_helpers/Request";
import {IUser} from "../interfaces/models/User";

export default class AuthMiddleware {
    public static autenticate (req: IRequest, res: Response, next: NextFunction) {
        // Get token from header
        const authToken = req.header("Authorization");
        const token = (authToken || "")?.replace("Bearer ", "");

        // Check if no token
        if (!token) {
            return res
                .status(HttpStatusCodes.UNAUTHORIZED)
                .json({msg: req.__("No token, authorization denied")});
        }
        // Verify token
        try {
            const payload: IUser = jwt.verify(token, process.env.JWT_SECRET) as IUser;
            req.user = payload;
            next();
        } catch (err) {
            return res
                .status(HttpStatusCodes.UNAUTHORIZED)
                .json({msg: "Token is not valid"});
        }
    }

    public static hasRole(roles: string | string[], strategy: "every" | "some" = "some") {
        let _roles: string[];
        if (!Array.isArray(roles)) { _roles = [roles]; }
        else { _roles = roles; }

        return (req: IRequest, res: Response, next: NextFunction) => {
            const user = req.user;
            if (!user) {
                return res
                    .status(HttpStatusCodes.UNAUTHORIZED)
                    .json({msg: req.__("No user, authorization denied")});
            }

            if (!user?.roles?.length) {
                return res
                    .status(HttpStatusCodes.UNAUTHORIZED)
                    .json({msg: req.__("User has no roles, authorization denied")});
            }


            switch (strategy) {
                case "every":
                    if (_roles.every(role => user.roles.includes(role))) {
                        next();
                        return;
                    }
                    break;
                case "some":
                    if (_roles.some(role => user.roles.includes(role))) {
                        next();
                        return;
                    }
                    break;
            }

            return res
                .status(HttpStatusCodes.UNAUTHORIZED)
                .json({msg: req.__("No right role, authorization denied")});
        }
    }
}
