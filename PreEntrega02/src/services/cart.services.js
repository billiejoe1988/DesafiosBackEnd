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

export const remove = async (cid) => {
    try {
      const cartDel = await cartDao.delete(cid);
      if (!cartDel) return false;
      else return cartDel;
    } catch (error) {
      console.log(error);
    }
  };

export const addProdToCart = async (cid, pid) => {
    try {
     const existCart = await getById(cid);
     const existProd = await prodDao.getById(pid);
     if(!existCart || !existProd) return null;
     const existProdInCart = await cartDao.existProdInCart(cid, pid);
     if(existProdInCart){
      const quantity = existProdInCart.products.find(p => p.product.toString() === pid).quantity + 1;
      return await cartDao.addProdToCart(cid, pid, quantity);
     }
     return await cartDao.addProdToCart(cid, pid);
    } catch (error) {
      console.log(error);
    }
  };
  
  export const removeProdToCart = async (cid, pid) => {
      try {
        const existCart = await getById(cid);
        const existProd = existCart.products.find(p => p.product._id.toString() === pid);
        if(!existCart || !existProd) return null;
        return await cartDao.removeProdToCart(cid, pid);
      
      } catch (error) {
        console.log(error);
      }
    };
  
    export const updateProdQuantityToCart = async (cid, pid, quantity) => {
      try {
        const existCart = await getById(cid);
        const existProd = existCart.products.find(p => p.product._id.toString() === pid);
        if(!existCart || !existProd) return null;
        return await cartDao.updateProdQuantityToCart(cid, pid, quantity)
      } catch (error) {
        console.log(error);
      }
    };
  
    export const clearCart = async (cid) => {
      try {
        const existCart = await getById(cid);
        if(!existCart) return null;
        return cartDao.clearCart(cid);
      } catch (error) {
        console.log(error);
      }
    };