import { Router } from "express";
import * as controller from "../controllers/ticket.controller.js";
import { isAuth } from "../middlewares/validateLogin.js";
const router = Router();

router.get("/", [isAuth], controller.getTicketById);
router.post("/purchase", [isAuth], controller.create);

export default router;
