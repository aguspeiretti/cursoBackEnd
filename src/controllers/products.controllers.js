import { cartService, productService } from "../services/index.js";
import productModel from "../dao/mongo/models/products.js";
import { pid } from "process";

const getProducts = async (req, res) => {
  const { page = 1 } = req.query;
  const {
    docs,
    totalPages,
    hasPrevPage,
    hasNextpage,
    prevPage,
    nextPage,
    ...rest
  } = await productModel.paginate({}, { page, limit: 3, lean: true });
  const products = docs;
  console.log(products);
  req.io.emit("updateProducts", products);
  res.send({
    status: "succes",
    payload: products,
    totalPages: totalPages,
    prevPage: prevPage,
    nextPage: nextPage,
    page: page,
    hasPrevPage: hasPrevPage,
    hasNextPage: hasNextpage,
  });
};

const postProduct = async (req, res) => {
  const { title, description, thumbnail, code, price, status, category } =
    req.body;

  if (
    !title ||
    !description ||
    !thumbnail ||
    !code ||
    !price ||
    !status ||
    !category
  )
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete Values" });

  const product = {
    title,
    description,
    thumbnail,
    code,
    price,
    status,
    category,
  };

  const result = await productService.createProductService(product);
  const products = await productService.getProductsService();
  req.io.emit("updateProducts", products);

  res.sendStatus(201);
};

const getProductsById = async (req, res) => {
  const { pid } = req.params;
  const products = await productService.getProductsByIdService({ _id: pid });
  if (!products)
    res.status(404).send({ status: "error", error: "product not found" });
  res.send({ status: "succes", payload: products });
};

const putProduct = async (req, res) => {
  const { pid } = req.params;
  const updateProduct = req.body;
  const result = await productService.updateproductService(pid, updateProduct);
  const products = await productService.getProductsService();
  req.io.emit("updateProducts", products);

  res.sendStatus(201);
};

const deleteProduct = async (req, res) => {
  const { pid } = req.params;

  await productService.deleteProductService(pid);
  const products = await productService.getProductsService();
  req.io.emit("updateProducts", products);

  res.sendStatus(410);
};

const addProduct = async (req, res) => {
  try {
    const pId = req.body.productId;
    const cId = req.user.cart;
    const result = await cartService.addProductToCartService(pId, cId);
    res.send({
      status: "success",
      message: `llego el id del producto ${pId} `,
      payload: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  getProducts,
  postProduct,
  getProductsById,
  putProduct,
  deleteProduct,
  addProduct,
};
