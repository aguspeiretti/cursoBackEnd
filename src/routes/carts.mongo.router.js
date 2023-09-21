import { Router } from "express";
import cartsControllers from "../controllers/carts.controllers.js";
import ticketController from "../controllers/ticket.controller.js";

const router = Router();

router.get("/", cartsControllers.getCart);

router.get("/:cid", cartsControllers.getCartById);

router.get("/:cid/purchase", ticketController.getTickets);

router.post("/", cartsControllers.createCart);

router.post("/:cid/products/:pid", cartsControllers.cartPost);

router.delete("/:cid/products/:pid", cartsControllers.cartDelete);

router.delete("/:cid", cartsControllers.cartDeleteById);

router.put("/:cid/products/:pid", cartsControllers.cartPut);

export default router;
