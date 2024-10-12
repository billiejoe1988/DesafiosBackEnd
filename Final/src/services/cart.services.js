// import cartDaoMongoDB from "../daos/mongodb/cart.dao.js";
// const cartDao = new cartDaoMongoDB();

import persistence from "../daos/factory.js";
const { cartDao } = persistence;

export const getAll = async () => {
  try {
    return await cartDao.getAll();
  } catch (error) {
    throw new Error(error);
  }
};
export const getById = async (id) => {
  try {
    return await cartDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (cart) => {
  try {
    return await cartDao.create(cart);
  } catch (error) {
    throw new Error(error);
  }
};
export const addProduct = async (id, productId, quantity) => {
  try {
    return await cartDao.addProduct(id, productId, quantity);
  } catch (error) {
    throw new Error(error);
  }
};

export const delProduct = async (id, productId) => {
  try {
    return await cartDao.delProduct(id, productId);
  } catch (error) {
    throw new Error(error);
  }
};

export const remove = async (id) => {
  try {
    return await cartDao.delete(id);
  } catch (error) {
    throw new Error(error);
  }
};
export const cleanCart = async (id) => {
  try {
    return await cartDao.cleanCart(id);
  } catch (error) {
    throw new Error(error);
  }
};
