
import { Router } from "express";
import AuthRoutes from "./api/AuthRoutes";
import UserRoutes from "./api/UserRoutes";

const Routes: Router = Router();

Routes.use("/auth", AuthRoutes);
Routes.use("/users", new UserRoutes().routes());

export default Routes;
