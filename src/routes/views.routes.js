import { Router } from "express";
import CartsManager from "../dao/mongo/managers/cart.js";
import { authRoles, privacy } from "../middlewares/auth.js";
import { passportCall } from "../utils.js";
import viewsControllers from "../controllers/views.controllers.js";

const router = Router();

const cartsManager = new CartsManager();

router.get(
  "/",
  passportCall("jwt", { redirect: "/login" }),
  authRoles("usuario"),
  viewsControllers.getView
);

router.get("/realTimeProducts", viewsControllers.getViewRealTime);

router.get("/cart", viewsControllers.getCartView);

router.get("/cart/:cid", viewsControllers.getCartViewById);

router.get("/chat", viewsControllers.getChatView);

router.get("/register", viewsControllers.getRegisterView);

router.get("/login", viewsControllers.getLoginView);

router.get("/restorePassword", viewsControllers.getRestorePaswordView);

export default router;
