//desarrolla servidor en express, podamos hacer ocnsulta a productos
//productmanager con persistencia de archivos
//servidor express que su archivo app.js importe archivo de product manager que tenemos.
//el servidor cuenta con edpoint /products, el cual debe leer archivo products y devolverlo como objeto.
//agrega querry param valor?limit= el cual recibe limite de resultados
//sino recibe query limite se devoleran todos resultados
//si recibe un limite, solo devolvera numero solicitado de productos
//ruta /products/:pid la cual debe recibir por req.params el pid (product id ) y devolver solo el producto solicitado.
//sugerencia tu clase lee archivos con problema usa async y await en endpoints y utiliza archivos productos el desafio es para gets.
// minimo archivo con 10 productos creados, para q los tutores no tengan que crear archivos 
// puerto 8080
// mandan a llamar localhost:8080/products sin query y debe devolver los 10 productos
// se mandan a llamar desde el navegador  localhost:8080/products?limit=5, eso debe devolver solo los primeros 5 de 10.
//llama localhost:8080/products/2 se deolvueve solo el id 2
// mandan a llamar desde navegador localhost:8080/products/2343243 y tiene q indicar que no existe.
//-------------------------------------------------------------------------------------------------------------------------------------------

import { v4 as uuidv4 } from 'uuid';

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

    async createProduct(title, description, price, thumbnail, code, stock) {
        try {
            const products = await this.getProducts();

            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log("Error: Todos los campos son obligatorios.");
                return;
            }

            if (products.some(product => product.code === code)) {
                console.log("Error, Code repetido");
                return;
            }

            const product = {
                id: uuidv4(),
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
            }

            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find(product => product.id === id);
            if (!product) {
                console.log("Product not found");
            }
            return product;
        } catch (error) {
            console.log("Error:", error.message); 
            return null;
        }
    }

    async deleteFile(){
        try{
            await fs.promises.unlink(this.path);
            console.log("archivo eliminado");

        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const i = products.findIndex(product => product.id === id);
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
    
    
    async modifyProduct(id, title, description, price, thumbnail, code, stock) {
        try {
            const products = await this.getProducts();
    
            const i = products.findIndex(product => product.id === id);
            if (i === -1) {
                throw new Error("Product not found");
            }
    
            products[i] = {
                id: id,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
            }            
    
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return products[i];
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

armarDB();

//-------------------------------------------------------------------------------------------