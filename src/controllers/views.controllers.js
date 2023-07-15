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

  res.render("products", {
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

const getViewHome = async (req, res) => {
  res.render("home", { css: "home" });
};

const getViewRealTime = async (req, res) => {
  res.render("realTimeProducts", { css: "realTimeProducts" });
};

const getCartView = async (req, res) => {
  const cId = req.user.cart;
  const carts = await cartService.getCartByIdService(cId).lean();
  for (const item of carts.products) {
    const { product, quantity } = item;
    if (product && product.price) {
      const price = product.price;
      const subtotal = price * quantity;
      item.subtotal = subtotal;
    }
  }

  let total = 0;
  for (const items of carts.products) {
    const { product, quantity } = items;
    if (product && product.price) {
      const price = product.price;
      total += price * quantity;
    }
  }
  res.render("cart", { total, carts, css: "cart" });
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

const getAdminView = async (req, res) => {
  res.render("admin", { css: "admin" });
};

const getPurchaseView = async (req, res) => {
  const user = req.user;
  const cId = req.user.cart;
  const carts = await cartService.getCartByIdService(cId).lean();
  for (const item of carts.products) {
    const { product, quantity } = item;
    const price = product.price;
    const subtotal = price * quantity;
    item.subtotal = subtotal;
  }
  let total = 0;
  for (const items of carts.products) {
    const { product, quantity } = items;
    const price = product.price;
    total += price * quantity;
  }
  res.render("purchase", { user, total, carts, css: "purchase" });
};

const getThanksView = async (req, res) => {
  res.render("thanks", { css: "thanks" });
};
const get401View = async (req, res) => {
  res.render("401error", { css: "401error" });
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
  getViewHome,
  getAdminView,
  getPurchaseView,
  getThanksView,
  get401View,
};
