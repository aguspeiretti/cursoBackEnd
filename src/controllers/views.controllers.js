import productModel from "../dao/mongo/models/products.js";
import { cartService } from "../services/index.js";

const getView = async (req, res) => {
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
};

const getViewRealTime = async (req, res) => {
  res.render("realTimeProducts", { css: "realTimeProducts" });
};

const getCartView = async (req, res) => {
  const carts = await cartService.getCartsService();
  res.render("cart", { carts, css: "cart" });
};

const getCartViewById = async (req, res) => {
  const cid = req.params.cid;
  const carts = await cartService.getCartsService();
  const cartSelected = carts.find((cart) => cart._id == cid);
  res.render("oneCart", { cartSelected, css: "cart" });
};

const getChatView = async (req, res) => {
  res.render("chat", { css: "chat" });
};

const getRegisterView = async (req, res) => {
  res.render("register", { css: "register" });
};

const getLoginView = async (req, res) => {
  res.render("login", { css: "login" });
};

const getRestorePaswordView = async (req, res) => {
  res.render("restorePassword", { css: "login" });
};

export default {
  getView,
  getViewRealTime,
  getCartView,
  getCartViewById,
  getChatView,
  getRegisterView,
  getLoginView,
  getRestorePaswordView,
};
