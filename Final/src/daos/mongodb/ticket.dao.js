import { TicketModel } from "./models/ticket.model.js";

export default class TicketDaoMongoDB {
  create = async (ticket) => {
    try {
      return await TicketModel.create(ticket);
    } catch (error) {
      throw new Error(error);
    }
  };
  getById = async (id) => {
    try {
      return await TicketModel.find({ userId: id });
    } catch (error) {
      throw new Error(error);
    }
  };
}
