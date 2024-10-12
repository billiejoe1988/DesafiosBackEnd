import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  code: { type: String, required: true },
  purchase_datetime: { type: String, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  products: [
    {
      _id: false,
      product: { type: Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number },
      price: { type: Number },
      subtotal: { type: Number },
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "users" },
});

ticketSchema.pre("find", function () {
  this.populate("products.product");
  //this.populate("userId"); se deja por si se quiere popular el usuario, pero no seria necesario implementarlo
});

export const TicketModel = model("ticket", ticketSchema);
