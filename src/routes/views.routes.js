import { Router } from "express";
import ProductsManager from "../dao/mongo/managers/productManager.js";
import CartsManager from "../dao/mongo/managers/cart.js";
import productModel from "../dao/mongo/models/products.js";
import { authRoles, privacy } from "../middlewares/auth.js";
import { passportCall } from "../utils.js";

const router = Router();

const productsManager = new ProductsManager();
const cartsManager = new CartsManager();

router.get(
  "/",
  passportCall("jwt", { redirect: "/login" }),
  authRoles("admin"),
  async (req, res) => {
    console.log(req.user);
    const { page = 1 } = req.query;
    let { limit = 5, sort = 1 } = req.query;

    const options = {
      page,
      limit: parseInt(limit),
      lean: true,
      sort: { price: sort },
    };

    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
      await productModel.paginate({}, options);

    const products = docs;

    res.render("home", {
      user: req.user,
      products,
      page: rest.page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      css: "products",
    });
  }
);
router.get("/realTimeProducts", async (req, res) => {
  res.render("realTimeProducts", { css: "realTimeProducts" });
});

router.get("/cart", async (req, res) => {
  const carts = await cartsManager.getCarts();
  res.render("cart", { carts, css: "cart" });
});

router.get("/cart/:cid", async (req, res) => {
  const cid = req.params.cid;
  const carts = await cartsManager.getCarts();
  const cartSelected = carts.find((cart) => cart._id == cid);
  res.render("oneCart", { cartSelected, css: "cart" });
});

router.get("/chat", async (req, res) => {
  res.render("chat", { css: "chat" });
});

router.get("/register", async (req, res) => {
  res.render("register", { css: "register" });
});

router.get("/login", async (req, res) => {
  res.render("login", { css: "login" });
});
router.get(
  "/restorePassword",

  async (req, res) => {
    res.render("restorePassword", { css: "login" });
  }
);

// router.get("/", passportCall("jwt"), (req, res) => {
//   console.log(req.user);
//   res.render("jwtProfile", { user: req.user });
// });

export default router;
