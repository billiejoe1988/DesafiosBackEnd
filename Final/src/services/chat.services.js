import MessageManager from "../daos/mongodb/chat.dao.js";
("../daos/mongodb/chat.dao.js");
const chatDao = new MessageManager();

export const getAllMongo = async () => {
  try {
    return await chatDao.getAllMongo();
  } catch (error) {
    throw new Error(error);
  }
};

export const createMsgMongo = async (chat) => {
  try {
    return await chatDao.createMsgMongo(chat);
  } catch (error) {
    throw new Error(error);
  }
};
