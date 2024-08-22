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
    if (!prod) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(prod);
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const { title, price, description } = req.body;

    if (!title || !price) {
      return res.status(400).json({ msg: 'Title and price are required fields' });
    }

    const newProd = await service.create(req.body);
    if (!newProd) {
      return res.status(500).json({ msg: 'Error creating product' });
    }

    res.json(newProd);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ msg: errors });
    }
    next(error.message);
  }
};

export const update = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const prodUpd = await service.update(pid, req.body);
    if (!prodUpd) {
      return res.status(404).json({ msg: 'Error updating product' });
    }
    res.json(prodUpd);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ msg: errors });
    }
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const prodDel = await service.remove(pid);
    if (!prodDel) {
      return res.status(404).json({ msg: 'Error removing product' });
    }
    res.json(prodDel);
  } catch (error) {
    next(error.message);
  }
};

// Controladores para productos de mocking
export const createProd = async (req, res, next) => {
  try {
    const { title, price, description } = req.body;

    if (!title || !price) {
      return res.status(400).json({ msg: 'Title and price are required fields' });
    }

    const newProd = await service.createProd(req.body);
    if (!newProd) {
      return res.status(500).json({ msg: 'Error creating mock product' });
    }

    res.json(newProd);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ msg: errors });
    }
    next(error.message);
  }
};

export const getProds = async (req, res, next) => {
  try {
    const prods = await service.getProds();
    res.json(prods);
  } catch (error) {
    next(error.message);
  }
};
