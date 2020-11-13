import auth from "./api/auth";
import user from "./api/user";
import profile from "./api/profile";
import { Router } from "express";

const router: Router = Router();

router.use("/", auth);
router.use("/users", user);
router.use("/profile", profile);

export default router;
