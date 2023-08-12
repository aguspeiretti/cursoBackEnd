import { Router } from "express";
import usersControllers from "../controllers/users.controllers.js";
import { passportCall } from "../utils.js";

const router = Router();

router.put("/premium", passportCall("jwt"), usersControllers.upDateUser);

export default router;
