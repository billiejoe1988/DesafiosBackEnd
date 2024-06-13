import { fileURLToPath } from 'url';
import path from 'path';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import express from 'express';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io'; 
import userRouter from './routes/users.router.js';
import productsRouter from './routes/product.router.js';
import routerCart from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import MongoStore from 'connect-mongo';
import { initMongoDB } from './daos/mongodb/connection.js';
import { saveMessageToMongoDB, saveMessageToFileSystem } from './services/message.services.js';
import dotenv from 'dotenv';

dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

// Configuración del motor de plantillas Handlebars
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware y configuraciones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Configuración connect-mongo
const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 180 * 60, 
    crypto: {
        secret: process.env.SECRET_KEY
    }
});

const storeConfig = {
    store,
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 180 * 1000 
    }
};

app.use(session(storeConfig));

// Middleware registrar solicitudes HTTP
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/carts', routerCart);
app.use('/', viewsRouter);

app.use(errorHandler);
app.get('/', (req, res) => {
    res.redirect('/products');
});
app.get('/chat', (req, res) => {
    res.render('chat');
});

// Socket.io para manejar la comunicación
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

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
