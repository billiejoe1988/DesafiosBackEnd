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
// se mandan a llamar desde el navegador  localhost:8080/products/products?limit=5, eso debe devolver solo los primeros 5 de 10.
//llama localhost:8080/products/2 se deolvueve solo el id 2
// mandan a llamar desde navegador localhost:8080/products/2343243 y tiene q indicar que no existe.

