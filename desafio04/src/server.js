import express from 'express';
import routerProducts from './routes/products.router.js';
import routerCart from './routes/cart.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCart);
app.get('/', (req, res) => {
    res.redirect('/api/products');
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Servidor funcionando en el puerto ${PORT}`));
