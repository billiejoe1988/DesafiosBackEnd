import { fileURLToPath } from 'url';
import path from 'path';
import exphbs from 'express-handlebars';
import express from 'express';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io'; 
import userRouter from './routes/users.router.js';
import productsRouter from './routes/product.router.js';
import routerCart from './routes/cart.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { initMongoDB } from './daos/mongodb/connection.js';
import { saveMessageToMongoDB, saveMessageToFileSystem } from './services/message.services.js';

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
app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/carts', routerCart);
app.get('/', (req, res) => {
    res.redirect('/products');
});
app.use(errorHandler);

app.get('/chat', (req, res) => {
    res.render('chat');
});

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
    socket.on('message', async (data) => {
        await saveMessageToMongoDB(data.user, data.message);
        saveMessageToFileSystem(data.user, data.message);
        socketServer.emit('message', data);
    });
});

initMongoDB();

const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
