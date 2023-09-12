import { Router } from "express";
import usersControllers from "../controllers/users.controllers.js";
import { passportCall } from "../utils.js";
import uploader from "../middlewares/uploader.js";
const router = Router();

router.put("/premium", passportCall("jwt"), usersControllers.upDateUser);

router.post("/:uid/documents", uploader.any(), usersControllers.updateUserData);

export default router;
