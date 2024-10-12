import { Schema, model } from "mongoose";

const ChatSchema = new Schema({
  user: String,
  message: String,
});

export const ChatModel = model("messages", ChatSchema);
