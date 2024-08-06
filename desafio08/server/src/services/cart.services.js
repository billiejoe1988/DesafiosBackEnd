import Services from "./class.services.js";
import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const prodDao = new ProductDaoMongoDB();
import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();

export default class CartServices extends Services {
  constructor() {
    super(cartDao);
  }

  addProdToCart = async (cartId, prodId) => {
    try {
      const existCart = await this.getById(cartId);
      if (!existCart) return null;
  
      const existProd = await prodDao.getById(prodId);
      if (!existProd) return null;

      return await this.dao.addProdToCart(cartId, prodId);
    } catch (error) {
      throw new Error(error);
    }
  };

  removeProdToCart = async (cartId, prodId) => {
    try {
      const existCart = await this.getById(cartId);
      if(!existCart) return null;
      const existProdInCart = await this.dao.existProdInCart(cartId, prodId);
      if (!existProdInCart) return null;
      return await this.dao.removeProdToCart(cartId, prodId);
    } catch (error) {
      throw new Error(error);
    }
  };

  updateProdQuantityToCart = async (cartId, prodId, quantity) => {
    try {
      const existCart = await this.getById(cartId);
      if(!existCart) return null;
  
      const existProdInCart = await this.dao.existProdInCart(cartId, prodId);
      if (!existProdInCart) return null;
  
      return await this.dao.updateProdQuantityToCart(cartId, prodId, quantity);
    } catch (error) {
      throw new Error(error);
    }
  };

  clearCart = async (cartId) => {
    try {
      const existCart = await this.getById(cartId);
      console.log("existCart-->", existCart);
      if (!existCart) return null;
      return await this.dao.clearCart(cartId);
    } catch (error) {
      throw new Error(error);
    }
  };
}

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