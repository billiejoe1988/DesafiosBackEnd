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
//llama get prodcuc y aparece el producto agregado
//llama update product y cambia algun producto se evalua q no elimine el id y q haya hechco la actualizacion
// delete q elimine el producto y arroje error sino existe el producto q quiero eliminar

class ProductManager {
    constructor (){
        this.product = [];
    }

    
}