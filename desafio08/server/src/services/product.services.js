import Services from "./class.services.js";
import ProductDaoMongo from "../daos/mongodb/product.dao.js";

const prodDao = new ProductDaoMongo();

export default class ProductService extends Services {
    constructor(){
        super(prodDao);
    }
};

export const getAll = async (page, limit, name, sort) => {
  try {
    return await prodDao.getAll(page, limit, name, sort);
  } catch (error) {
    console.log(error);
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
