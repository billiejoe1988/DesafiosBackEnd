import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const cartsData = await fs.promises.readFile(this.path, 'utf8');
                if (cartsData.trim() === '') return []; 
                return JSON.parse(cartsData);
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async createCart(productsWithQ) {
        try {
            const existingCarts = await this.getCarts();
            let updated = false;
    
            existingCarts.forEach(cart => {
                if (cart.products.some(product => productsWithQ.pid === product.pid)) {
                    cart.products.forEach(product => {
                        if (product.pid === productsWithQ.pid) {
                            product.quantity += productsWithQ.quantity;
                        }
                    });
                    updated = true;
                }
            });
    
            if (!updated) {
                const cart = {
                    cid: uuidv4(),
                    products: [{ pid: productsWithQ.pid, quantity: productsWithQ.quantity }]
                };
                existingCarts.push(cart);
            }
    
            await fs.promises.writeFile(this.path, JSON.stringify(existingCarts, null, 2));
        } catch (error) {
            console.log(error);
        }
    }
    
    async addToCart(cid, product) {
        try {
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex(cart => cart.cid === cid);

            if (cartIndex !== -1) {
                const existingProductIndex = carts[cartIndex].products.findIndex(p => p.pid === product.pid);
                if (existingProductIndex !== -1) {
                    carts[cartIndex].products[existingProductIndex].quantity += product.quantity;
                } else {
                    carts[cartIndex].products.push(product);
                }
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
                return carts[cartIndex];
            } else {
                throw new Error("Cart not found");
            }
        } catch (error) {
            throw new Error(`Error adding product to cart: ${error.message}`);
        }
    }

    async getCartById(cid) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.cid === cid);
            if (!cart) {
                throw new Error("Cart not found");
            }
            return cart;
        } catch (error) {
            throw new Error(`Error getting cart by ID: ${error.message}`);
        }
    }
    
    async deleteFile() {
        try {
            await fs.promises.unlink(this.path);
            console.log("Archivo eliminado");

        } catch (error) {
            console.log(error)
        }
    }

    async deleteCart(cid) {
        try {
            const carts = await this.getCarts();
            const i = carts.findIndex(cart => cart.cid === cid);
            if (i === -1) {
                throw new Error("Cart not found");
            }
            console.log(`${carts[i].title} ha sido borrado`); 
            carts.splice(i, 1); 
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        } catch (error) {
            console.log(error);
        }
    }
    
    async modifyCart(cid, products) {
        try {
            const carts = await this.getCarts();
    
            const i = carts.findIndex(cart => cart.cid === cid);
            if (i === -1) {
                throw new Error("Cart not found");
            }
    
            const updatedCart = {
                cid: cid,
                products: products
            };
    
            carts[i] = updatedCart;
    
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return updatedCart;
        } catch (error) {
            console.log(error);
        }
    }
}

const cartManager = new CartManager('./carts.json');
