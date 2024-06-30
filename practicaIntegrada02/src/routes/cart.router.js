import express from 'express';
import * as cartController from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/', cartController.getAllCarts);
router.post('/:cid/product/:pid', cartController.createOrUpdateCart);
router.get('/:cid', cartController.getCartById);

export default router;
