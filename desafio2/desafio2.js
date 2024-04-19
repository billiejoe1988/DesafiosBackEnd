//clase productmanager, el cual trabajam ltiples productos curd en persistencia de archivo(basado desafio 1)
//incluir, clase varaible this.path se inicializa desde le ocnstrcutor y debe reinscribir ruta al generar instancia
//objeto. id incrementa automaticamente no enviarse desde el cuerpo, title, description,price, thumbnail, code,stock
//incluid metodo add product, recibe e objeto con el formato y asignar id, guardar en array.
//metodo getproducts, lee archivos de productos y devuelve todos productos en formato de array
//metodo getproductbyid el cual recibe un id y lee el archivo, busca producto con el id especificado, devolverlo en objeto.
// metodo updateProduct, el cual rebie el id dle producto a a ctuaklizar asi como el campo a actualizar (objto completo como una db), 
//actualiza producto q tenga ese id en el archivo(no se borra el id)
//metodo delete product, el cual recibe id y elimina producto con el id en el archivo
//entregable con el nombre productmanager.js
//para el test. instancia clase prodcutmanager, llamara a getprpducts y devulve array vacio
//llama metodo add product: title: “producto prueba” - description:”Este es un producto prueba” - price:200, - thumbnail:”Sin imagen” - code:”abc123”, - stock:25
//objeto agrega con id generado automaticamente sin repetirse
// +  llama get prodcuc y aparece el producto agregado
//  +  llama update product y cambia algun producto se evalua q no elimine el id y q haya hechco la actualizacion
// +  delete q elimine el producto y arroje error sino existe el producto q quiero eliminar

const fs = require('fs');

class ProductManager {
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
                id: this.#getMaxId(products) + 1,
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

    #getMaxId(products) {
        let maxId = 0;
        if (products && products.length > 0) {
            products.map((product) => {
                if (product.id > maxId) maxId = product.id;
            });
        }
        return maxId;
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

const test = async () => {
    console.log("--------------------array products")
    console.log(await productManager.getProducts())
    console.log("-------------------- create products")
    await productManager.createProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
    await productManager.createProduct("producto prueba2", "Este es un producto prueba2", 201, "Sin imagen2", "abc1234", 251);
    console.log("--------------------array products")
    console.log(await productManager.getProducts())
    console.log("--------------------product id");
    console.log(await productManager.getProductById(1))
    console.log("--------------------product id erroneo");
    console.log(await productManager.getProductById(5))
    console.log("-------------------test code repetido");
    await productManager.createProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
    console.log("-------------------Verificar todos los espacios esten completos al agregar producto")
    await productManager.createProduct("producto incompleto", 25);
    console.log("--------------------update product ");
    await productManager.modifyProduct(1, "producto  modificado", "Este es un producto prueba modificado", 300, "non imagen", "zzz123", 50);
    console.log("--------------------array products con modificacion")
    console.log(await productManager.getProducts())
    console.log("--------------------delete product error ");
    await productManager.deleteProduct(5);
    console.log("--------------------delete product");
    await productManager.deleteProduct(2);
    console.log("--------------------array products restantes")
    console.log(await productManager.getProducts())
    console.log("--------------------delete file");
    await productManager.deleteFile();
    console.log("--------------------file deleted - end test");
}

test()