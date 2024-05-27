import './daos/mongodb/connection.js'; 
import express from 'express';
import morgan from 'morgan';
import productsRouter from './routes/product.router.js';
import routerCart from './routes/cart.router.js';
import { errorHandler } from './middlewares/errorHandler.js'; 
import { initMongoDB } from './daos/mongodb/connection.js'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev'));

app.use('/products', productsRouter);
app.use('/carts', routerCart);
app.get('/', (req, res) => {
    res.redirect('/products');
});
app.use(errorHandler);

initMongoDB();

const PORT = 8080;
app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));
