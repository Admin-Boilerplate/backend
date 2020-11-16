import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import {User} from "../models/User";
import {IUser} from "../interfaces/models/User";

export default class AuthController {

    public async register(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
            const user = new User({email, password: hash});
            const created = await user.save();

            if (!created) {
                return res.status(404).send({
                    success: false,
                    message: `User wasn't created`,
                    data: null
                });
            }

            res.status(200).send({
                success: true,
                data: created
            });


        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    }

    public async login(req: Request, res: Response) {
        const {email, password} = req.body;
        try {
            let user: IUser = await User.findOne({email});

            if (!user) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({
                    errors: [
                        {
                            msg: "Invalid Credentials email"
                        }
                    ]
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({
                    errors: [
                        {
                            msg: "Invalid Credentials"
                        }
                    ]
                });
            }

            const payload: any = {
                _id: user._id,
                email: user.email
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRATION},
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
}
