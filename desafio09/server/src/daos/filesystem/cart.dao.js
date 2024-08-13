import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default class CartModel {
    constructor(path) {
        this.path = path;
    }

    async getAllCarts() {
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

    async createOrUpdateCart(products) {
        try {
            const cid = uuidv4();

            const newCart = { cid, products };
            const existingCarts = await this.getAllCarts();

            existingCarts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(existingCarts, null, 2));

            return newCart;
        } catch (error) {
            throw new Error(`Error al crear o actualizar el carrito: ${error.message}`);
        }
    }

    async getCartById(cartId) {
        try {
            const carts = await this.getAllCarts();
            return carts.find(cart => cart.cid === cartId);
        } catch (error) {
            console.log("Error:", error.message); 
            return null;
        }
    }
}
