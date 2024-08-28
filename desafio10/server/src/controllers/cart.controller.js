import * as cartService from '../services/cart.services.js';
import Controllers from "./class.controller.js";
import { createResponse } from "../utils.js";

export default class CartController extends Controllers {
  constructor() {
    super(cartService);
  }

  async getAllCarts(req, res, next) {
    try {
      const carts = await this.service.getAllCarts();
      createResponse(res, 200, carts);
    } catch (error) {
      next(error);
    }
  }

  async createOrUpdateCart(req, res, next) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
      const cart = await this.service.createOrUpdateCart(cid, pid, quantity);
      createResponse(res, 200, cart);
    } catch (error) {
      next(error);
    }
  }

  async getCartById(req, res, next) {
    const { cid } = req.params;
    try {
      const cart = await this.service.getCartById(cid);
      if (!cart) {
        createResponse(res, 404, { message: 'Cart not found' });
      } else {
        createResponse(res, 200, cart);
      }
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const cartDel = await this.service.remove(id);
      if (!cartDel) {
        createResponse(res, 404, { msg: "Error deleting cart!" });
      } else {
        createResponse(res, 200, { msg: `Cart id: ${id} deleted` });
      }
    } catch (error) {
      next(error.message);
    }
  }

  async addProdToCart(req, res, next) {
    try {
      const { idCart, idProd } = req.params;
      const newProdToUserCart = await this.service.addProdToCart(idCart, idProd);
      if (!newProdToUserCart) {
        createResponse(res, 400, { msg: "Product | Cart not exist" });
      } else {
        createResponse(res, 200, newProdToUserCart);
      }
    } catch (error) {
      next(error.message);
    }
  }

  async removeProdToCart(req, res, next) {
    try {
      const { idCart, idProd } = req.params;
      const delProdToUserCart = await this.service.removeProdToCart(idCart, idProd);
      if (!delProdToUserCart) {
        createResponse(res, 400, { msg: "Product | Cart not exist" });
      } else {
        createResponse(res, 200, { msg: `Product ${idProd} deleted from cart` });
      }
    } catch (error) {
      next(error.message);
    }
  }

  async updateProdQuantityToCart(req, res, next) {
    try {
      const { idCart, idProd } = req.params;
      const { quantity } = req.body;
      const updateProdQuantity = await this.service.updateProdQuantityToCart(idCart, idProd, quantity);
      if (!updateProdQuantity) {
        createResponse(res, 400, { msg: "Error updating product quantity in cart" });
      } else {
        createResponse(res, 200, updateProdQuantity);
      }
    } catch (error) {
      next(error.message);
    }
  }

  async clearCart(req, res, next) {
    try {
      const { idCart } = req.params;
      const clearCart = await this.service.clearCart(idCart);
      if (!clearCart) {
        createResponse(res, 400, { msg: "Error clearing cart" });
      } else {
        createResponse(res, 200, clearCart);
      }
    } catch (error) {
      next(error.message);
    }
  }
}
