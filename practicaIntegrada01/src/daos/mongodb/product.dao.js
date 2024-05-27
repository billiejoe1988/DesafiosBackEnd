import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
  async getAll() {
    try {
      const response = await ProductModel.find({});
      return response;
    } catch (error) {
      throw new Error(error);
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
