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

  async addProdToCart(cid, pid, quantity) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) return null;
      const existProdIndex = cart.products.findIndex(p => p.product.toString() === pid);

      if(existProdIndex !== -1) {
        cart.products[existProdIndex].quantity = quantity;
      } else cart.products.push({ product: pid, quantity });

      await cart.save();

      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async existProdInCart(cid, pid){
    try {
      return await CartModel.findOne({
        _id: cid,
        products: { $elemMatch: { product: pid } }
      })
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProdToCart(cid, pid) {
    try {
      return await CartModel.findOneAndUpdate(
        { _id: cid },
        { $pull: { products: { product: pid } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProdQuantityToCart(cid, pid, quantity) {
    try {
     return await CartModel.findOneAndUpdate(
      { _id: cid, 'products.product': pid },
      { $set: { 'products.$.quantity': quantity } },
      { new: true }
     );
    } catch (error) {
      console.log(error);
    }
  }

  async clearCart(cid) {
    try {
     return await CartModel.findByIdAndUpdate(
      cid,
      { $set: { products: [] } },
      { new: true }
     );
    } catch (error) {
      console.log(error);
    }
  }
}
