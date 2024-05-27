import { fileURLToPath } from 'url';
import path from 'path';
import exphbs from 'express-handlebars';
import express from 'express';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import productsRouter from './routes/product.router.js';
import routerCart from './routes/cart.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { initMongoDB } from './daos/mongodb/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use('/products', productsRouter);
app.use('/carts', routerCart);
app.get('/', (req, res) => {
    res.redirect('/products');
});
app.use(errorHandler);

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

initMongoDB();

const PORT = 8080;
httpServer.listen(PORT, () => console.log(`Servidor funcionando en el puerto ${PORT}`));
