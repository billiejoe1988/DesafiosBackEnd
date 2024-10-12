import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/validateLogin.js";
const router = Router();

router.get("/", [isAuth, isAdmin], controller.getAll);

router.get("/userCart", [isAuth], controller.getById);

router.put("/userCart/products/:pid", [isAuth], controller.addProduct); 

router.delete("/userCart/delete/:pid", [isAuth], controller.delProduct);

router.delete("/userCart/delete", [isAuth], controller.remove); 

router.delete("/userCart/cleanCart", [isAuth], controller.cleanCart); 

export default router;
