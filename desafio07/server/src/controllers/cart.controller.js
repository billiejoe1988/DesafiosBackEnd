import * as cartService from '../services/cart.services.js';

export const getAllCarts = async (req, res, next) => {
    try {
        const carts = await cartService.getAllCarts();
        res.json(carts);
    } catch (error) {
        next(error);
    }
};

export const createOrUpdateCart = async (req, res, next) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await cartService.createOrUpdateCart(cid, pid, quantity);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};


export const getCartById = async (req, res, next) => {
    const { cid } = req.params;
    try {
        const cart = await cartService.getCartById(cid);
        if (!cart) {
            res.status(404).json({ message: 'Cart not found' });
        } else {
            res.json(cart);
        }
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cartDel = await service.remove(id);
      if (!cartDel) res.status(404).json({ msg: "Error delete cart!" });
      else res.status(200).json({ msg: `Cart id: ${id} deleted` });
    } catch (error) {
      next(error.message);
    }
  };

  export const addProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const newProdToUserCart = await service.addProdToCart(
        idCart,
        idProd,
      );
      if (!newProdToUserCart) res.json({ msg: "Product | Cart not exist" });
      else res.json(newProdToUserCart);
    } catch (error) {
      next(error.message);
    }
  };

  export const removeProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const delProdToUserCart = await service.removeProdToCart(
        idCart,
        idProd,
      );
      if (!delProdToUserCart) res.json({ msg: "Product | Cart not exist" });
      else res.json({msg: `product ${idProd} deleted to cart`});
    } catch (error) {
      next(error.message);
    }
  };

  export const updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const { quantity } = req.body;
      const  updateProdQuantity = await service.updateProdQuantityToCart(
        idCart,
        idProd,
        quantity
      );
      if (!updateProdQuantity) res.json({ msg: "Error update product quantity to cart" });
      else res.json(updateProdQuantity);
    } catch (error) {
      next(error.message);
    }
  };

  export const clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const clearCart = await service.clearCart(
        idCart,
      );
      if (!clearCart) res.json({ msg: "Error clear cart" });
      else res.json(clearCart);
    } catch (error) {
      next(error.message);
    }
  };