export default class CartService {
  constructor(dao) {
    this.dao = dao;
  }
  getCartsService = () => {
    return this.dao.getCarts();
  };
  getCartByIdService = (cartId) => {
    return this.dao.getCartById(cartId);
  };
  CreateCartService = (cart) => {
    return this.dao.createCart(cart);
  };
  addProductToCartService = (cid, productFromBody) => {
    return this.dao.addProductToCart(cid, productFromBody);
  };
  deleteProductToCartService = (cid, products) => {
    return this.dao.deleteProductToCart(cid, products);
  };
  updateProductInCartService = (cid, products, quantity) => {
    return this.dao.updateProductInCart(cid, products, quantity);
  };
  deleteCartService = (cid) => {
    return this.dao.deleteCart(cid);
  };
  finalizePurchase = () => {
    return this.dao.finalizePurchase();
  };
  deleteCartItems = async (cartId) => {
    try {
      const cart = await this.dao.getCartById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }

      // Eliminar los productos del carrito
      cart.products = [];

      await cart.save();
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
