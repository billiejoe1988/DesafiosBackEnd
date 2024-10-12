import * as service from "../services/cart.services.js";
import * as productService from "../services/product.services.js";
import UserRepository from "../repository/user.repository.js";
import { httpResponse } from "../utils/httpResponse.js";
const userRepository = new UserRepository();

export const getAll = async (req, res, next) => {
  try {
    const carts = await service.getAll();
    httpResponse.Ok(res, carts);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    const cart = await service.getById(cid);
    if (!cart) httpResponse.NotFound(res, cart, "cart not found");
    else httpResponse.Ok(res, cart);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const cart = await service.create(req.body);
    if (!cart) httpResponse.NotFound(res, cart, "bad request");
    httpResponse.Ok(res, cart);
  } catch (error) {
    next(error.message);
  }
};
export const addProduct = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    const { pid } = req.params;
    const { user } = req.session?.passport;
    const product = await productService.getById(pid);
    if (!product)
      return httpResponse.NotFound(res, product, "Product not found");
    let owner = "";
    owner = product.owner.toString();
    if (owner === user)
      return httpResponse.Unauthorized(
        res,
        product,
        "you cant add to cart your own product"
      );

    let { quantity } = req.body;
    if (!quantity || quantity < 0) quantity = 1;
    const cart = await service.addProduct(cid, pid, quantity);
    if (!cart)
      return httpResponse.Unauthorized(
        res,
        cart,
        "bad request adding products - the quantity not be the same"
      );
    return httpResponse.Ok(res, cart);
  } catch (error) {
    next(error.message);
  }
};

export const delProduct = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    const { pid } = req.params;
    const cart = await service.delProduct(cid, pid);
    if (!cart)
      return httpResponse.NotFound(
        res,
        cart,
        "bad request. Product is not in cart"
      );
    return httpResponse.Ok(res, cart);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    return httpResponse.NotFound(res, cid, "delete function disabled");
    /*  const cart = await service.remove(cid);
    if (!cart) httpResponse.NotFound(res, cart, "Error removing cart");
    else httpResponse.Ok(res, cart); */
  } catch (error) {
    next(error.message);
  }
};
export const cleanCart = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    const cart = await service.cleanCart(cid);
    if (!cart) httpResponse.NotFound(res, cart, "Error cleaning cart");
    else httpResponse.Ok(res, cart);
  } catch (error) {
    next(error.message);
  }
};
export const silentCleanCart = async (req, res, next) => {
  try {
    const cid = req.session?.message?.cart;
    const cart = await service.cleanCart(cid);
    if (!cart) return httpResponse.NotFound(res, cart, "Error cleaning cart");
  } catch (error) {
    next(error.message);
  }
};
