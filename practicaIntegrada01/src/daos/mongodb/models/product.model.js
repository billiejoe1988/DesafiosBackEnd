import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  pid: { type: String, required: true, unique: true }, 
  title: { type: String, required: true }, 
  description: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  code: { type: String, required: true }, 
  stock: { type: String, required: true }, 
  status: { type: Boolean, required: true }, 
  category: { type: Number, required: true }, 
  thumbnail: { type: String, default: null }
});

export const ProductModel = mongoose.model('Product', productsSchema);
