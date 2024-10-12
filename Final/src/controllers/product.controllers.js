import * as service from "../services/product.services.js";
import { httpResponse } from "../utils/httpResponse.js";
import { logger } from "../utils/logger.js";
import { sendGmail } from "./email.controllers.js";

//import { __dirname } from "../utils.js";

export const getAll = async (req, res, next) => {
  try {
    const { title, page, limit, sort } = req.query;
    const hasTitle = title ? `&title=${title}` : "";
    const hasSort = sort ? `&sort=${sort}` : "";
    let products = await service.getAll(title, page, limit, sort);
    const nextLink = products.hasNextPage
      ? `http://localhost:8080/api/products?limit=${products.limit}&page=${products.nextPage}${hasTitle}${hasSort}`
      : null;
    const prevLink = products.hasPrevPage
      ? `http://localhost:8080/api/products?limit=${products.limit}&page=${products.prevPage}${hasTitle}${hasSort}`
      : null;
    const response = {
      payload: products.docs,
      info: {
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink,
        nextLink,
      },
    };

    if (!products) httpResponse.NotFound(res, response, "product not found");
    else httpResponse.Ok(res, response);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    if (pid.length !== 24)
      return httpResponse.Forbidden(res, "", "Verify the Id Product length");
    const product = await service.getById(pid);
    if (!product) httpResponse.NotFound(res, product, "product not found");
    else {
      // testCookies(req, res, product);
      httpResponse.Ok(res, product);
    }
  } catch (error) {
    next(error.message);
  }
};

export const getByCategory = async (req, res, next) => {
  try {
    const { category, stock, page, limit, sort } = req.query;
    const hasCategory = category ? `&category=${category}` : "";
    const hasStock = stock ? `&stock=${stock}` : "";
    const hasSort = sort ? `&sort=${sort}` : "";
    const products = await service.getByCategory(
      category,
      stock,
      page,
      limit,
      sort
    );
    const nextLink = products.hasNextPage
      ? `http://localhost:8080/api/products/cat?limit=${products.limit}&page=${products.nextPage}${hasCategory}${hasSort}${hasStock}`
      : null;
    const prevLink = products.hasPrevPage
      ? `http://localhost:8080/api/products/cat?limit=${products.limit}&page=${products.prevPage}${hasCategory}${hasSort}${hasStock}`
      : null;
    const response = {
      payload: products.docs,
      info: {
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink,
        nextLink,
      },
    };

    if (!products) httpResponse.NotFound(res, response, "product not found");
    else httpResponse.Ok(res, response);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const prod = req.body;
    const owner = req.session?.passport?.user;
    const isPremium = req.session.message.owner === "owner";
    prod.owner = owner;
    let product = await service.create(prod);
    if (!product) return httpResponse.NotFound(res, product, "Bad Request");
    return httpResponse.Ok(res, product);
  } catch (error) {
    next(error.message);
  }
};
export const update = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const { user } = req.session.passport;
    const { role } = req.session.message;
    const product = await service.getById(pid);
    if (!product)
      return httpResponse.NotFound(res, product, "Product not found");
    let owner = "";
    owner = product.owner.toString();
    if (owner !== user && role !== "admin")
      return httpResponse.Unauthorized(
        res,
        product,
        "you cant update another owner product"
      );

    let newValues = req.body;

    const productUpd = await service.update(pid, newValues);
    if (!productUpd)
      httpResponse.NotFound(res, productUpd, "error update products");
    else httpResponse.Ok(res, productUpd);
  } catch (error) {
    next(error.message);
  }
};
export const remove = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const { user } = req.session.passport;
    const { role } = req.session.message;
    const product = await service.getById(pid);
    if (!product)
      return httpResponse.NotFound(res, product, "Product not found");
    let owner = "";
    owner = product.owner.toString();
    if (owner !== user && role !== "admin")
      return httpResponse.Unauthorized(
        res,
        product,
        "you cant remove another owner product"
      );

    const productDeleted = await service.remove(pid);
    if (!product)
      httpResponse.NotFound(res, productDeleted, "error removing product");
    else {
      req.session.emailType = "productDeleted";
      req.session.productDeleted = productDeleted;
      sendGmail(req, res, next);
      return httpResponse.Ok(res, productDeleted);
    }
  } catch (error) {
    next(error.message);
  }
};

const testCookies = (req, res, product) => {
  logger.info(product);

  //Test de cookies
  //con el response (res) las seteamos y con request (req) las obtenemos
  res.cookie("product", product.title); // El servidor almacena una cookie en el front
  res.cookie("price", product.price); // El servidor almacena una cookie en el front
  res.cookie("stock", product.stock, { maxAge: 900000 }); // El servidor almacena una cookie en el front
  res.cookie("description", product.description, {
    signed: true,
    httpOnly: true,
  }); // El servidor almacena una cookie en el front
  const cookies = req.cookies;
  logger.info(`Galletas:  ${cookies}`); // el servidor recibe una cookie desde el front
  res.cookie;
  const signedCookies = req.signedCookies;
  logger.info(signedCookies); // el servidor recibe una cookie signed desde el front
  //res.clearCookie("product");  // se utiliza para eliminar una cookie, si no sabemos las cookies, utilizamos el metodo Object.keys para obtener los nombres de todas las cookies
  //Fin test cookies
};

export const mockingProducts = async (req, res, next) => {
  try {
    const { cant } = req.query;
    const product = await service.mockingProducts(cant);
    if (!product) httpResponse.NotFound(res, product, "Bad Request");
    httpResponse.Ok(res, product);
  } catch (error) {
    logger.error(`Creation error: ${error}`);
    next(error);
  }
};

export const getMockingProducts = async (req, res, next) => {
  try {
    const product = await service.getMockingProducts();

    if (!product) httpResponse.NotFound(res, product, "Bad Request");
    httpResponse.Ok(res, product);
  } catch (error) {
    next(error);
  }
};
