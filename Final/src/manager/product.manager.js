import { existsSync, promises } from "fs";
import { v4 as uuidv4 } from "uuid";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  #generateId = async () => {
    const newId = uuidv4();
    return newId;
  };

  #validateCode = async (code) => {
    const products = await this.getProducts();
    if (products.length > 0) {
      const findCode = products.some((elem) => elem.code === code);
      if (findCode) {
        throw new Error(
          `ERROR: failed to insert product code: ${code}. Code field can not be duplicated`
        );
      }
    }
    return true;
  };
  #verifyField = (title, description, price, img, code, stock, category) => {
    if (!title || title.length === 0) {
      throw new Error("Error: Title field can not be empty");
    }
    if (!description || description.length === 0) {
      throw new Error("Error: Descripción field can not be empty");
    }
    if (!price || isNaN(price) || price < 0) {
      throw new Error(
        "Error: Price field can not be empty or less than zero and need to be a number"
      );
    }
    if (!Array.isArray(img)) {
      throw new Error(
        "Error: image path need to be an array or not be declared"
      );
    }
    if (!code || code.length === 0) {
      throw new Error("Error: Code field can not be empty");
    }
    if (isNaN(stock) || stock < 0) {
      throw new Error(
        "Error: Stock field can not be empty, must be a number bigger or equal to zero"
      );
    }
    if (!category || category.length === 0) {
      throw new Error("Error: Category field can not be empty");
    }
  };
  #verifiyId = (id) => {
    if (!id) {
      throw new Error("Error: ID field can not be empty");
    }
  };
  #saveFile = async (products) => {
    await promises.writeFile(this.path, JSON.stringify(products));
  };
  addProduct = async ({
    title,
    description,
    price,
    img = [],
    code,
    stock,
    category,
  }) => {
    try {
      const products = await this.getProducts();
      this.#verifyField(title, description, price, img, code, stock, category);
      const validCode = await this.#validateCode(code);
      if (validCode) {
        const product = {
          id: await this.#generateId(),
          title,
          description,
          price,
          img,
          code,
          stock,
          category,
          status: true,
        };

        products.push(product);
        await this.#saveFile(products);
        return product;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getProducts = async () => {
    try {
      if (existsSync(this.path)) {
        const productsFile = await promises.readFile(this.path, "utf8");
        const products = JSON.parse(productsFile);
        return products;
      } else return [];
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getProductById = async (id) => {
    try {
      this.#verifiyId(id);
      const products = await this.getProducts();
      const product = products.find((element) => element.id === id);
      if (product) return product;

      throw new Error(`ERROR ID ${id} NOT FOUND. not valid Id`);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateProduct = async ({ ...product }) => {
    // /traigo el producto completo por si product llega sin alguna de los elemento

    try {
      const products = await this.getProducts();
      const productForUpdate = await this.getProductById(product.id);

      if (productForUpdate) {
        const productIndex = products.findIndex(
          (element) => element.id === productForUpdate.id
        );
        const finalProduct = { ...productForUpdate, ...product };
        products.splice(productIndex, 1, finalProduct);

        await this.#saveFile(products);
        return finalProduct;
      }

      throw new Error("ERROR: product can't be updated");
    } catch (error) {
      throw new Error(error.message);
    }
  };
  deleteProduct = async (id) => {
    try {
      const product = await this.getProductById(id);
      if (!product) throw new Error(error.message);
      const products = await this.getProducts();
      const productForDelete = products.find((element) => element.id === id);
      const productIndex = products.findIndex((element) => element.id === id);
      products.splice(productIndex, 1);

      this.#saveFile(products);
      return productForDelete;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
