import ProductDaoMongo from "./mongodb/product.dao.js";
import ProductDaoFS from "./filesystem/product.dao.js";
import cartDaoMongoDB from "./mongodb/cart.dao.js";
import UserDaoMongo from "./mongodb/user.dao.js";
import TicketDaoMongoDB from "./mongodb/ticket.dao.js";
import { initMongoDB } from "./mongodb/connection.js";
import config from "../../config.js";
let prodDao = null;
let userDao = null;
let cartDao = null;
let ticketDao = null;

let persistence = config.PERSISTENCE;

switch (persistence) {
  case "fs":
    prodDao = new ProductDaoFS("./src/data/products.json");
    break;
  case "mongo":
    initMongoDB();
    userDao = new UserDaoMongo();
    prodDao = new ProductDaoMongo();
    cartDao = new cartDaoMongoDB();
    ticketDao = new TicketDaoMongoDB();

    break;

  default:

    initMongoDB();
    userDao = new UserDaoMongo();
    prodDao = new ProductDaoMongo();
    cartDao = new cartDaoMongoDB();
    ticketDao = new TicketDaoMongoDB();
    break;
}

export default { userDao, prodDao, cartDao, ticketDao };
