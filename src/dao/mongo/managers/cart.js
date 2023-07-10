import mongoose from "mongoose";
import cartsModel from "../models/carts.js";
import productModel from "../models/products.js";

export default class CartsManager {
  getCarts = (params) => {
    return cartsModel.find(params).lean();
  };

  getCartById = (param) => {
    return cartsModel.findById(param);
  };

  createCart = (cart) => {
    return cartsModel.create(cart);
  };

  addProductToCart = async (pid, cid, quantity) => {
    try {
      let cart = await cartsModel.findById(cid);

      if (!cart) {
        throw new Error("Carrito no encontrado!!!");
      }

      const existingProductIndex = cart.products.findIndex(
        (product) => product.product._id.toString() === pid
      );

      if (existingProductIndex !== -1) {
        if (quantity) {
          cart.products[existingProductIndex].quantity = quantity;
        } else {
          cart.products[existingProductIndex].quantity += 1;
        }
      } else {
        if (quantity) {
          cart.products.push({ product: pid, quantity: quantity });
        } else {
          cart.products.push({ product: pid, quantity: 1 });
        }
      }

      cart = await cart.save();

      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  deleteProductToCart = async (cid, pid) => {
    try {
      let cart = await cartsModel.findById(cid);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      const existingProductIndex = cart.products.findIndex(
        (product) => product.product._id.toString() === pid
      );

      if (existingProductIndex !== -1) {
        cart.products.splice(existingProductIndex, 1);
      } else {
        throw new Error("producto no encontrado");
      }

      cart = await cart.save();

      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  deleteCart = async (cid) => {
    try {
      const deletedCart = await cartsModel.findByIdAndDelete(cid);

      if (!deletedCart) {
        throw new Error("Carrito no encontrado");
      }

      return deletedCart;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateProductInCart = async (cid, pid, newQuantity) => {
    try {
      const cartToUpdate = await cartsModel.findById(cid);
      console.log(cartToUpdate);
      if (!cartToUpdate) {
        throw new Error("Carrito no encontrado");
      }
      const existingProductIndex = cartToUpdate.products.findIndex(
        (product) => product.product._id == pid
      );
      if (existingProductIndex === -1) {
        throw new Error("Producto no encontrado en el carrito");
      }

      const product = cartToUpdate.products[existingProductIndex].product;
      console.log(product);
      cartToUpdate.products[existingProductIndex] = {
        product: product,
        quantity: newQuantity,
      };

      const updatedCart = await cartToUpdate.save();
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };
}
