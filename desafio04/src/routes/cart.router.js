import { Router } from 'express';
import CartManager from '../manager/cart.manager.js';

const routerCart = Router();
const cartManager = new CartManager('./carts.json');

routerCart.get('/', async (req, res) => {
    try {
        let limit = req.query.limit;
        let carts = await cartManager.getCarts();

        if (limit && !isNaN(parseInt(limit))) {
            carts = carts.slice(0, parseInt(limit));
        }

        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

routerCart.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        let cart;

        const existingCart = await cartManager.getCartById(cid);

        if (existingCart) {
            cart = await cartManager.addToCart(cid, { pid, quantity });
        } else {
            cart = await cartManager.createCart({ pid, quantity });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

routerCart.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

export default routerCart;
