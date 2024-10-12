import { Router } from "express";
import * as controller from "../controllers/logger.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/validateLogin.js";
const router = Router();

router.get("/", [isAuth, isAdmin], controller.loggerTest);

export default router;
