import {__dirname} from '../utils.js';
import ProductDaoFS from '../daos/filesystem/product.dao.js';

const prodDao = new ProductDaoFS(`${__dirname}/daos/filesystem/products.json`);

export const getAll = async () => {
  try {
    return await prodDao.getAll();
  } catch (error) {
    throw new Error(error);
  }
};

export const getById = async (pid) => {
  try {
    return await prodDao.getById(pid);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (obj) => {
  try {
    return await prodDao.create(obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const update = async (pid, obj) => {
  try {
    return await prodDao.update(pid, obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const remove = async (pid) => {
  try {
    return await prodDao.delete(pid);
  } catch (error) {
    throw new Error(error);
  }
};
