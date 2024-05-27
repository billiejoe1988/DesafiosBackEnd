import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {
  async getAll() {
    try {
      const carts = await CartModel.find({});
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(cid) {
    try {
      const cart = await CartModel.findById(cid);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(cartData) {
    try {
      const cart = await CartModel.create(cartData);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(cid, cartData) {
    try {
      const cart = await CartModel.findByIdAndUpdate(cid, cartData, {
        new: true,
      });
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(cid) {
    try {
      const cart = await CartModel.findByIdAndDelete(cid);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
}
