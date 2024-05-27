import { __dirname } from '../utils.js';
import CartDaoFS from '../daos/filesystem/cart.dao.js';

const cartDao = new CartDaoFS(`${__dirname}/daos/filesystem/carts.json`);

export const getAllCarts = async () => {
    return await cartDao.getAllCarts();
};

export const createOrUpdateCart = async (cid, pid, quantity) => {
    let cart;
    const existingCart = await cartDao.getCartById(cid);
    if (existingCart) {
        cart = await cartDao.addToCart(cid, { pid, quantity });
    } else {
        cart = await cartDao.createCart({ pid, quantity });
    }
    return cart;
};

export const getCartById = async (cid) => {
    return await cartDao.getCartById(cid);
};
