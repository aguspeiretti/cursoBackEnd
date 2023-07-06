export default class ProductService {
  constructor(dao) {
    this.dao = dao;
  }

  getProductsService = () => {
    return this.dao.getProducts();
  };

  getProductsByIdService = (params) => {
    return this.dao.getProductsById(params);
  };
  createProductService = (product) => {
    return this.dao.createProduct(product);
  };
  updateproductService = (id, product) => {
    return this.dao.updateproduct(id, product);
  };
  deleteProductService = (id) => {
    return this.dao.deleteProduct(id);
  };
}
