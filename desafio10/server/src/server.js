import 'dotenv/config';
import { fileURLToPath } from 'url';
import path from 'path';
import express, { json, urlencoded } from 'express';
import http from 'http';
import passport from 'passport';
import './passport/local.js';
import './passport/github.js';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userRouter from './routes/users.router.js';
import productsRouter from './routes/product.router.js';
import routerCart from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import MainRouter from './routes/index.js';
import { configSession } from './config/config.session.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { initMongoDB } from './daos/mongodb/connection.js';
import { saveMessageToMongoDB, saveMessageToFileSystem } from './services/message.services.js';
import logger from './utils/logger.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce API',
            version: '1.0.0',
            description: 'Documentación de la API del proyecto de e-commerce',
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Asegúrate de que la ruta sea correcta
    //accede a http://localhost:8080/api-docs para ver los comentarios
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Configuración del servidor
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
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 180 * 60,
    crypto: {
        secret: process.env.SECRET_KEY,
    },
});

const storeConfig = {
    store,
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 180 * 1000,
    },
};

app.use(session(storeConfig));
app.use(passport.initialize());
app.use(passport.session());

// Agregar el logger en puntos importantes
logger.debug('Logger en desarrollo iniciado');
logger.info('Configuración de la aplicación cargada');
logger.warn('Asegúrate de revisar los logs regularmente');

// Rutas
app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/carts', routerCart);
app.use('/api', new MainRouter().getRouter());
app.use('/', viewsRouter);

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Ruta para probar logs
app.get('/loggerTest', (req, res) => {
    logger.debug('Mensaje de depuración desde /loggerTest');
    logger.info('Mensaje informativo desde /loggerTest');
    logger.warn('Mensaje de advertencia desde /loggerTest');
    logger.error('Mensaje de error desde /loggerTest');
    res.send('Logs generados. Revisa la consola y el archivo error.log.');
});

// Manejar solicitudes para la aplicación React
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use(errorHandler);

// Página principal de la aplicación
app.get('/', (req, res) => {
    res.redirect('/products');
});

// Página de chat
app.get('/chat', (req, res) => {
    res.render('chat');
});

// Socket.io para manejar la comunicación en tiempo real
socketServer.on('connection', (socket) => {
    logger.info(`Usuario conectado: ${socket.id}`);

    socket.on('disconnect', () => {
        logger.info('Usuario desconectado');
    });

    socket.on('message', async (data) => {
        await saveMessageToMongoDB(data.user, data.message);
        saveMessageToFileSystem(data.user, data.message);
        socketServer.emit('message', data);
    });
});

// Inicialización de MongoDB si se usa como persistencia
const PERSISTENCE = process.env.PERSISTENCE;
if (PERSISTENCE === 'MONGO') initMongoDB();

// Arranque del servidor
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
    logger.info(`Servidor funcionando en el puerto ${PORT}`);
});
