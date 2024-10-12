import { cartModel } from "./models/cart.model.js";

export default class cartDaoMongoDB {
  getAll = async () => {
    try {
      return await cartModel.find();
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const response = await cartModel
        .findById(id)
        .populate("products.product");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (cart) => {
    try {
      return await cartModel.create(cart);
    } catch (error) {
      throw new Error(error);
    }
  };

  addProduct = async (id, productId, quantity) => {
    try {
      const { products } = await cartModel.findById(id, { products: true });

      const productAdded = products.some(
        (element) => element.product.toString() === productId
      );
      if (!productAdded) {
        const addedProduct = await cartModel.updateOne(
          { _id: id },
          { $push: { products: { product: productId, quantity: quantity } } },
          { new: true }
        );
        if (!addedProduct.modifiedCount) return null;
        else return await cartModel.findById(id);
      } else {
        const addProduct = await cartModel.updateOne(
          { _id: id, "products.product": productId },
          { $set: { "products.$.quantity": quantity } },
          { new: true }
        );
        if (!addProduct.modifiedCount) return null;
        else return await cartModel.findById(id);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  delProduct = async (id, productId) => {
    try {
      const delProduct = await cartModel.updateOne(
        {
          _id: id,
        },
        { $pull: { products: { product: productId } } }
      );

      if (!delProduct.modifiedCount) return;
      else return delProduct;
    } catch (error) {
      throw new Error(error);
    }
  };
  delete = async (id) => {
    try {
      return await cartModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  };
  cleanCart = async (cid) => {
    try {
      const clearCart = await cartModel.findByIdAndUpdate(
        cid,
        { $set: { products: [] } },
        { new: true }
      );
      return clearCart;
    } catch (error) {
      throw new Error(error);
    }
  };
}
