import { ChatModel } from "./models/chat.model.js";

export default class MessageManager {
  async createMsgMongo(obj) {
    try {
      const newMsg = await ChatModel.create(obj);
      return newMsg;
    } catch (error) {
      throw new Error(error);
    }
  }
  getAllMongo = async () => {
    try {
      const msgs = await ChatModel.find().lean();
      return msgs;
    } catch (error) {
      throw new Error(error);
    }
  };
}
