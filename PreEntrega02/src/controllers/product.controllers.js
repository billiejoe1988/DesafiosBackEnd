import * as service from "../services/product.services.js";

export const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, name, sort } = req.query;
    const response = await service.getAll(page, limit, name, sort);
    const nextLink = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null;
    const prevLink = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null;

    res.json({
      payload: response.docs,
      info: {
        count: response.totalDocs,
        totalPages: response.totalPages,
        nextLink,
        prevLink,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage
      }
    });
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  const { pid } = req.params;
  try {
    const prod = await service.getById(pid);
    if (!prod){
      res.status(404).json({msg: 'Product not found'});
    } else {
      res.json(prod);
    }
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const newProd = await service.create(req.body);
    if (!newProd) res.status(404).json({msg: 'Error creating product'});
    else res.json(newProd);
  } catch (error) {
    next(error.message);
  }
};

export const update = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const prodUpd = await service.update(pid, req.body);
    if (!prodUpd) res.status(404).json({msg: 'Error updating product'});
    else res.json(prodUpd);
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const prodDel = await service.remove(pid);
    if (!prodDel) res.status(404).json({msg: 'Error removing product'});
    else res.json(prodDel);
  } catch (error) {
    next(error.message);
  }
};
