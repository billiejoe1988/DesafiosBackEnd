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
