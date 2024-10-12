import persistence from "../daos/factory.js";
import { generateProduct } from "../utils/utils.js";
const { prodDao } = persistence;

export const getAll = async (title, page, limit, sort) => {
  try {
    return await prodDao.getAll(title, page, limit, sort);
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllWebSocket = async () => {
  try {
    return await prodDao.getAllWebSocket();
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllWebSocketPaginated = async (title, page, limit, sort) => {
  try {
    return await prodDao.getAllWebSocketPaginated(title, page, limit, sort);
  } catch (error) {
    throw new Error(error);
  }
};
export const getById = async (id) => {
  try {
    return await prodDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};
export const getByCategory = async (category, stock, page, limit, sort) => {
  try {
    return await prodDao.getByCategory(category, stock, page, limit, sort);
  } catch (error) {
    throw new Error(error);
  }
};
export const create = async (product) => {
  try {
    return await prodDao.create(product);
  } catch (error) {
    throw new Error(error);
  }
};
export const update = async (id, product) => {
  try {
    return await prodDao.update(id, product);
  } catch (error) {
    throw new Error(error);
  }
};
export const remove = async (id) => {
  try {
    return await prodDao.delete(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const mockingProducts = async (cant = 50) => {
  try {
    const productsArray = [];
    for (let i = 0; i < cant; i++) {
      const product = generateProduct();
      productsArray.push(product);
    }
    return await prodDao.create(productsArray);
  } catch (error) {
    throw new Error(error);
  }
};

export const getMockingProducts = async () => {
  try {
    return await prodDao.getMockingProducts();
  } catch (error) {
    throw new Error(error);
  }
};
