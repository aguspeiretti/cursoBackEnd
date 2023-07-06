import CartManager from "../dao/mongo/managers/cart.js";
import CartService from "./cart.service.js";

import ProductManager from "../dao/mongo/managers/productManager.js";
import ProductService from "./product.service.js";

import UserManager from "../dao/mongo/managers/users.js";
import UserService from "./user.service.js";

export const userService = new UserService(new UserManager());
export const productService = new ProductService(new ProductManager());
export const cartService = new CartService(new CartManager());
