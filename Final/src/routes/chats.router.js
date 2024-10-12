import { Router } from "express";
import * as controller from "../controllers/chat.controllers.js";
const router = Router();

router.get("/", controller.getAll);

export default router;
