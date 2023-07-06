import { Router } from "express";
import cartsControllers from "../controllers/carts.controllers.js";

const router = Router();

router.get("/", cartsControllers.getCart);

router.get("/:cid", cartsControllers.getCartById);

router.post("/", cartsControllers.createCart);

router.post("/:cid/products/:pid", cartsControllers.cartPost);

router.delete("/:cid/product/:pid", cartsControllers.cartDelete);

router.delete("/:cid", cartsControllers.cartDeleteById);

router.put("/:cid/products/:pid", cartsControllers.cartPut);

export default router;
