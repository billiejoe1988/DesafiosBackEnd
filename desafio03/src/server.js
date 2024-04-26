import express from  'express';
import ProductManager from './manager/manager.js';

const app = express();
const productManager = new ProductManager('./products.json');

app.use(express.json());

app.get('/', (req, res) => {
    res.send ('<h1> Products Manager Server </h1>')
});

app.get('/products', async (req, res) => {
    try{
        const { limit } = req.query;
        let products = await productManager.getProducts();
        if (limit){
            const limitInt = parseInt(limit);
            if (!isNaN(limitInt) && limitInt > 0) {
              products = products.slice(0, limitInt);
            }
        }
        res.status(200).json(products)
    } catch (error){
        res.status(500).json({msg: error.message })
    }
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const products = await productManager.getProducts();
        const product = products.find(p => p.id === id);
        if (!product) {
            res.status(404).json({msg: 'product not found '});
        } else {
            res.status(200).json(product);
        } 
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
})

app.post('/products', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        await productManager.createProduct(title, description, price, thumbnail, code, stock);
        res.status(200).json({ msg: "Producto creado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

app.put('/products/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        await productManager.modifyProduct(id, title, description, price, thumbnail, code, stock);
        res.status(200).json({ msg: "Producto modificado correctamente" });
    } catch (error) {
        res.status(500).json ({msg: error.message})
    }
})

app.delete('/products/:id', async(req, res) => {
    const { id } = req.params;
    try {
        await productManager.deleteProduct(id);
        res.status(200).json({ msg: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json ({msg: error.message})
    }
})

const PORT = 8080;

app.listen(PORT, () => console.log(`Servidor funcionando en el puerto ${PORT}`));
