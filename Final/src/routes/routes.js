import { Router } from "express";
import productRouter from "./products.router.js";
import userRouter from "./user.router.js";
import cartRouter from "./carts.router.js";
import viewsRouter from "./views.router.js";
import chatsRouter from "./chats.router.js";
import ticketRouter from "./ticket.router.js";
import loggerRouter from "./logger.router.js";

export default class MainRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.use("/products", productRouter);
    this.router.use("/user", userRouter);
    this.router.use("/carts", cartRouter);
    this.router.use("/vistas", viewsRouter);
    this.router.use("/chats", chatsRouter);
    this.router.use("/ticket", ticketRouter);
    this.router.use("/logger", loggerRouter);
  }

  getRouter() {
    return this.router;
  }
}
