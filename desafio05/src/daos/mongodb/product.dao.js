import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
  async getAll(page = 1, limit = 10, name, sort) {
    try {
      const filter = name ? { 'name': name } : {};
      let sortOrder = {};
      if(sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null; 
      return await ProductModel.paginate(filter, { page, limit, sort: sortOrder }); 
    } catch (error) {
      console.log(error);
    }
  }

  async getById(pid) {
    try {
      const response = await ProductModel.findById(pid);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(obj, pid) {
    try {
      const response = await ProductModel.findByIdAndUpdate(pid, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(pid) {
    try {
      const response = await ProductModel.findByIdAndDelete(pid);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
