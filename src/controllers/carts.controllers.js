import { cartService } from "../services/index.js";
import productsControllers from "./products.controllers.js";

const getCart = async (req, res) => {
  const carts = await cartService.getCartsService();
  res.send(carts);
};

const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const carts = await cartService.getCartByIdService({ _id: cid });
    if (!carts)
      res.status(404).send({ status: "error", error: "cart not found" });
    res.send({ status: "succes", payload: carts });
  } catch (err) {
    console.log(err);
  }
};

const createCart = async (req, res) => {
  try {
    cartService.CreateCartService();
    res.send("cart created");
  } catch (error) {
    console.log(error);
    return res.status(404).send({ status: "error", error: "cart not created" });
  }
};

const cartPost = async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const { quantity } = req.body;
    const addProductCart = await cartService.addProductToCartService(
      cid,
      pid,
      quantity
    );
    res.send({ status: "success", payload: addProductCart });
  } catch (err) {
    console.log(err);
  }
};

const cartDelete = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const deletedProductCart = await cartService.deleteProductToCartService(
      cid,
      pid
    );
    res.send({ status: "succes", payload: deletedProductCart });
  } catch (err) {
    console.log(err);
  }
};

const cartDeleteById = async (req, res) => {
  try {
    const { cid } = req.params;
    const deletedCart = await cartService.deleteCartService(cid);
    res.send({ status: "success", payload: deletedCart });
  } catch (err) {
    console.log(err);
  }
};

const cartPut = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const newQuantity = req.body;
    const updatedCart = await cartService.updateProductInCartService(
      cid,
      pid,
      newQuantity
    );

    res.send({ status: "success", payload: updatedCart });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error", error: err.message });
  }
};

export default {
  getCart,
  getCartById,
  createCart,
  cartPost,
  cartDelete,
  cartDeleteById,
  cartPut,
};
