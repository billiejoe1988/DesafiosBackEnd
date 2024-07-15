import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

export default class ProductDaoFS {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const productsJSON = JSON.parse(products);
        return productsJSON;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getById(pid) {
    try {
      const products = await this.getAll();
      const product = products.find((prod) => prod.pid === pid);
      if (product) {
        return product;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      const product = {
        pid: uuidv4(), 
        ...obj,
      };
      const productsFile = await this.getAll();
      productsFile.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async update(pid, obj) {
    try {
      const productsFile = await this.getAll();
      const index = productsFile.findIndex((prod) => prod.pid === pid);
      if (index === -1) {
        throw new Error(`Product with ID ${pid} not found`);
      } else {
        const updatedProduct = { ...productsFile[index], ...obj };
        productsFile[index] = updatedProduct;
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
        return updatedProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async delete(pid) {
    try {
      const productsFile = await this.getAll();
      const updatedProducts = productsFile.filter((prod) => prod.pid !== pid);
      await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
      return { message: `Product with ID ${pid} deleted successfully` };
    } catch (error) {
      console.log(error);
    }
  }
}
