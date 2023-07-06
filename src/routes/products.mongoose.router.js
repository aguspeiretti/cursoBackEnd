import { Router } from "express";
import ProductsManager from "../dao/mongo/managers/productManager.js";
import productsControllers from "../controllers/products.controllers.js";

const router = Router();

export default router;

const productsManager = new ProductsManager();

router.get("/", productsControllers.getProducts);

router.post("/", productsControllers.postProduct);

router.get("/:pid", productsControllers.getProductsById);

router.put("/:pid", productsControllers.putProduct);

router.delete("/:pid", productsControllers.deleteProduct);
