import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new Schema({
  title: { type: String, required: true, max: 50, index: true },
  description: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  img: [String],
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
  category: {
    type: String,
    enum: {
      values: [
        "Cervezas",
        "Vinos",
        "Licores",
        "Tés",
        "Refrescos",
        "Bebidas sin alcohol",
        "Cócteles listos para beber",
        "Cafés",
        "Combos",
      ],
      message: "{VALUE} no es una categoría valida",
    },
    require: true,
    index: true,
  },
  status: { type: Boolean, default: true },
  faker: { type: Boolean, default: false },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});
ProductSchema.plugin(mongoosePaginate);
export const ProductModel = model("products", ProductSchema);

//default: new ObjectId("66a6b94325975b3f1d4efc9a"),
