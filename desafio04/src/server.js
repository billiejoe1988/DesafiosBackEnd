import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path'; 
import exphbs from 'express-handlebars';
import routerProducts from './routes/products.router.js';
import routerCart from './routes/cart.router.js';
import ProductManager from './manager/manager.js';
import { __dirname } from "./utils.js";

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCart);

const productManager = new ProductManager('./products.json');

app.get('/', async (req, res) => {
  res.render('home', { products: await productManager.getProducts() });
});

app.get('/realtimeproducts', async (req, res) => {
  res.render('realtimeproducts');
});

socketServer.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
  socket.emit('saludoDesdeBack', 'Bienvenido a websockets');
  socket.on('newProduct', async (prod) => {
    await productManager.createProduct(prod);
    const products = await productManager.getProducts();
    socketServer.emit('products', products);
  });
});

const PORT = 8080;
httpServer.listen(PORT, () => console.log(`Servidor funcionando en el puerto ${PORT}`));
