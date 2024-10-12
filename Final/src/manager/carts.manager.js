import { existsSync, promises } from "fs";
import { v4 as uuidv4 } from "uuid";
import { ProductManager } from "./product.manager.js";
const productManager = new ProductManager("./src/data/products.json");

export class cartsManager {
  constructor(path) {
    this.path = path;
  }
  #generateId = () => {
    const newId = uuidv4();
    return newId;
  };
  #verifiyId = (id) => {
    if (!id) {
      throw new Error("Error: ID field can not be empty");
    }
  };
  #validatecart = async (id) => {
    //se va a usar para agregar productos al cart
    const carts = await this.getcarts();
    if (carts.length > 0) {
      const findId = carts.some((elem) => elem.code === code);
      if (findId) {
        throw new Error(
          `ERROR: failed to insert product code: ${code}. Code field can not be duplicated`
        );
      }
    }
    return true;
  };

  #savecarts = async (carts) => {
    await promises.writeFile(this.path, JSON.stringify(carts));
  };

  getcarts = async () => {
    try {
      if (existsSync(this.path)) {
        const cartsFile = await promises.readFile(this.path, "utf8");
        const carts = JSON.parse(cartsFile);
        return carts;
      } else return [];
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getcartById = async (id) => {
    try {
      this.#verifiyId(id);
      const carts = await this.getcarts();
      const cart = carts.find((element) => element.cartId === id);
      if (cart) return cart;

      throw new Error(`ERROR ID ${id} NOT FOUND. not valid cart Id`);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addcart = async () => {
    try {
      const carts = await this.getcarts();
      const newcart = { cartId: this.#generateId(), products: [] };

      carts.push(newcart);
      await this.#savecarts(carts);
      return newcart;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  addProduct = async (cid, pid) => {
    try {
      let carts = await this.getcarts();
      const cart = await this.getcartById(cid);
      //if (!cart) res.status(400).json({ msj: "bad cart request" });
      const product = await productManager.getProductById(pid);
      //if (!product) res.status(400).json({ msj: "bad product request" });
      const cartIndex = carts.findIndex((elem) => elem.cartId === cid);

      const productsIncart = carts[cartIndex].products;
      const existsProduct = productsIncart.some((elem) => elem.id === pid);

      if (!existsProduct) {
        productsIncart.push({ id: pid, quantity: 1 });
      } else {
        const productIndex = productsIncart.findIndex(
          (elem) => elem.id === pid
        );

        carts[cartIndex].products[productIndex].quantity += 1;
      }
      await this.#savecarts(carts);
      return productsIncart;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
