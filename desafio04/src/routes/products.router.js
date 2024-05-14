import { Router } from 'express';
import ProductManager from '../manager/manager.js';

const routerProducts = Router();
const productManager = new ProductManager('./products.json');

routerProducts.get('/', async (req, res) => {
    try {
        let limit = req.query.limit;
        let products = await productManager.getProducts();

        if (limit && !isNaN(parseInt(limit))) {
            products = products.slice(0, parseInt(limit));
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

routerProducts.post('/', async (req, res) => {
    try {
        const product = await productManager.createProduct(req.body);
        res.json(product);
    } catch (error) {
        res.json(error.message);
    }
});

routerProducts.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid);
        if (!product) res.status(404).json({ msg: 'Product not found' });
        else res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

routerProducts.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const productUpd = await productManager.modifyProduct(pid, req.body);
        if (!productUpd) res.status(404).json({ msg: 'Error updating product' });
        res.status(200).json(productUpd);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

routerProducts.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        await productManager.deleteProduct(pid);
        res.status(200).json({ msg: `Product id: ${pid} deleted successfully` });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

export default routerProducts;
