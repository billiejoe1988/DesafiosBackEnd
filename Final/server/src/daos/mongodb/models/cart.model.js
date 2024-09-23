import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    cid: { type: String, required: true },
    products: [{
        pid: { type: String, required: true },
        quantity: { type: Number, required: true }
    }]
});

export const CartModel = mongoose.model('Cart', cartSchema);
