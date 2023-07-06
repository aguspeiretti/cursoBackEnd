import { Router } from "express";
import sessionControllers from "../controllers/sessions.controllers.js";
import { passportCall } from "../utils.js";

const router = Router();

router.post(
  "/register",
  passportCall("register"),
  sessionControllers.registerPost
);

router.get("/registerFail", sessionControllers.getRegisterFail);

router.post("/login", passportCall("login"), sessionControllers.loginPost);

router.post("/logout", sessionControllers.logOutPost);

router.get("/github", passportCall("github"), (req, res) => {});

router.get(
  "/githubcallback",
  passportCall("github"),
  sessionControllers.githubCallback
);

router.post("/restorePassword", sessionControllers.restorePaswordPost);
export default router;
