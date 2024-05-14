import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productsData = await fs.promises.readFile(this.path, 'utf8');
                if (productsData.trim() === '') return [];
                return JSON.parse(productsData);
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async createProduct(product) {
        try {
            const { title, description, price, thumbnail, code, stock, category } = product;

            if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
                throw new Error("Todos los campos son obligatorios.");
            }

            const products = await this.getProducts();

            if (products.some(existingProduct => existingProduct.code === code)) {
                throw new Error("El código del producto ya existe.");
            }

            const newProduct = {
                pid: uuidv4(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                category,
                status: true
            };

            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

            return newProduct;
        } catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    async getProductById(pid) {
        try {
            const products = await this.getProducts();
            const product = products.find(product => product.pid === pid);
            if (!product) {
                console.log("Product not found");
            }
            return product;
        } catch (error) {
            console.log("Error:", error.message);
            return null;
        }
    }

    async deleteProduct(pid) {
        try {
            const products = await this.getProducts();
            const i = products.findIndex(product => product.pid === pid);
            if (i === -1) {
                throw new Error("Product not found");
            }
            console.log(`${products[i].title} ha sido borrado`);
            products.splice(i, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.log(error);
        }
    }

    async modifyProduct(pid, productData) {
        try {
            const products = await this.getProducts();

            const i = products.findIndex(product => product.pid === pid);
            if (i === -1) {
                throw new Error("Product not found");
            }
    
            const updatedProduct = {
                pid: pid,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
                status: status !== undefined ? status : true,
            };
    
            products[i] = updatedProduct;
    
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return updatedProduct;
        } catch (error) {
            console.log(error);
        }
    }
}

const productManager = new ProductManager ('./products.json') ;

//--------------------------------------------------------------------------------------------

const armarDB = async () => {
    console.log("--------------- creando 15 productos en la bd ");

    for (let i = 1; i <= 15; i++) {
        await productManager.createProduct(`Producto ${i}`, `Este es el producto ${i}`, 200 + i, `Imagen ${i}`, `abc${i}`, 25 + i);
    }

    console.log("------------------------------------nuevo contenido del array");
    console.log(await productManager.getProducts());
}


//-------------------------------------------------------------------------------------------