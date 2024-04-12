// realizar clase ProductManager que gestione un conjunto de productos
//debe crearse desde el cosntrcutor el cual es un array vacio
//cada producto tiene. title, description, price, thumbnail, code, stock
// debe contar con metodo addProduct, el cual agrega el producto al inicial.
//*valida q no se repita cambios y todos los campos sean obligatorios,
//*al agregarlo, debe crearse con un id autoincrementable
//metodo getProducts, el cual dene devolver un array con todos los productos creados.
//debe contar con getProductById el cual busca en un array un producto que coincida c el id, y sino... mostrar error not found.

class ProductManager {

    constructor () {
        this.products = [];
    }

    addProduct (title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Error: Todos los campos son obligatorios.");
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.log("Error, Code repetido");
            return;
        }

        const product = {
            id: this.#getMaxId() + 1,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        }
            this.products.push(product) 
    }

    #getMaxId() {
        let maxId = 0 ;
        this.products.map((product) => {
        if (product.id > maxId) maxId = product.id
        });
        return maxId
    }

    getProducts () {
      return this.products;
    }
    
    getProductById (id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            return product
        } else {
            console.log("Error, Product not found")
        }
    }
}

const productManager = new ProductManager ();
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25 );
productManager.addProduct("producto prueba2", "Este es un producto prueba2", 201, "Sin imagen2", "abc1234", 251 );
console.log("--------------------array products")
console.log(productManager.getProducts());
console.log("--------------------product id");
console.log(productManager.getProductById(1))
console.log(productManager.getProductById(5))
console.log("-------------------test code repetido");
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25 );
console.log("-------------------Verificar todos los espacios esten completos al agregar producto")
productManager.addProduct("producto incompleto", 25 );
