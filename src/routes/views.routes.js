import { Router } from "express";
import CartsManager from "../dao/mongo/managers/cart.js";
import { authRoles, privacy } from "../middlewares/auth.js";
import { passportCall } from "../utils.js";
import viewsControllers from "../controllers/views.controllers.js";

const router = Router();

const cartsManager = new CartsManager();

router.get(
  "/products",
  passportCall("jwt", { redirect: "/login" }),
  authRoles("usuario"),
  viewsControllers.getView
);

router.get(
  "/",
  passportCall("jwt", { redirect: "/login" }),
  authRoles("usuario"),
  viewsControllers.getViewHome
);

router.get("/realTimeProducts", viewsControllers.getViewRealTime);

router.get(
  "/cart",
  passportCall("jwt", { redirect: "/login" }),
  authRoles("usuario"),
  viewsControllers.getCartView
);

router.get("/cart/:cid", viewsControllers.getCartViewById);

router.get("/chat", viewsControllers.getChatView);

router.get("/register", viewsControllers.getRegisterView);

router.get("/login", viewsControllers.getLoginView);

router.get("/restorePassword", viewsControllers.getRestorePaswordView);

router.get(
  "/admin",
  passportCall("jwt", { redirect: "/401error" }),
  authRoles("admin"),
  viewsControllers.getAdminView
);

router.get(
  "/purchase",
  passportCall("jwt", { redirect: "/401error" }),
  authRoles("usuario"),
  viewsControllers.getPurchaseView
);

router.get(
  "/thanks",
  passportCall("jwt", { redirect: "/401error" }),
  authRoles("usuario"),
  viewsControllers.getThanksView
);

router.get("/401error", viewsControllers.get401View);

export default router;
