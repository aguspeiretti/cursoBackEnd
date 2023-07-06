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
  updateProductInCartService = (cid, products) => {
    return this.dao.updateProductInCart(cid, products);
  };
  deleteCartService = (cid) => {
    return this.dao.deleteCart(cid);
  };
}
