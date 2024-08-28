import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema({
  pid: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  status: { type: Boolean, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, default: null }
});

productsSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model('Product', productsSchema);

