import { logger } from "../../utils/logger.js";
import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
  getAll = async (title, page = 1, limit = 10, sort) => {
    try {
      const query = title
        ? {
            title: { $regex: title, $options: "i" }, // regex, para que se pueda filtrar por cualquier parte del titulo, 'i' para que la búsqueda no distinga entre mayúsculas y minúsculas
          }
        : {};

      let order = {};
      if (sort) order.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
      return await ProductModel.paginate(query, { page, limit, sort: order });
    } catch (error) {
      throw new Error(error);
    }
  };
  getAllWebSocket = async () => {
    try {
      return await ProductModel.find().lean();
    } catch (error) {
      throw new Error(error);
    }
  };
  getAllWebSocketPaginated = async (title, page = 1, limit = 10, sort) => {
    try {
      const query = title
        ? {
            title: { $regex: title, $options: "i" }, // regex, para que se pueda filtrar por cualquier parte del titulo, 'i' para que la búsqueda no distinga entre mayúsculas y minúsculas
          }
        : {};

      let order = {};
      if (sort) order.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
      return await ProductModel.paginate(query, {
        page,
        limit,
        sort: order,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };
  getByCategory = async (category, stock, page = 1, limit = 10, sort) => {
    try {
      const hasStock = stock ? Number(stock) : 0;
      const query = category
        ? {
            category: { $regex: category, $options: "i" }, // regex, para que se pueda filtrar por cualquier parte de la categoria, 'i' para que la búsqueda no distinga entre mayúsculas y minúsculas
            stock: { $gte: hasStock },
          }
        : {};
      let order = {};
      if (sort) order.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
      return await ProductModel.paginate(query, { page, limit, sort: order });
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (product) => {
    try {
      return await ProductModel.create(product);
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async (id, product) => {
    try {
      return await ProductModel.findByIdAndUpdate(id, product, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  };
  delete = async (id) => {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  getMockingProducts = async () => {
    try {
      return await ProductModel.find({ faker: true });
    } catch (error) {
      throw new Error(error);
    }
  };
}
