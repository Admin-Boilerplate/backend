import { Request, Response } from "express";
import User, { IUser } from "../../models/User";

export default class UserController {

    public async findAll(req: Request, res: Response) {
        try {
            const users = await User.find<IUser>();
            if (!users) {
                return res.status(404).send({
                    success: false,
                    message: 'Users not found',
                    data: null
                });
            }

            res.status(200).send({
                success: true,
                data: users
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
