import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/validateLogin.js";
const router = Router();

router.get("/", [isAuth, isAdmin], controller.getAll);

router.get("/userCart", [isAuth], controller.getById);

router.put("/userCart/products/:pid", [isAuth], controller.addProduct); // agrega o actualiza producto en carrito

router.delete("/userCart/delete/:pid", [isAuth], controller.delProduct);

router.delete("/userCart/delete", [isAuth], controller.remove); //elimina el carrito completo
//DEPRECADO, si elimino el carrito de la colección carts, va a traer errores al traer los datos de usuario, y no se le podrá vincular otro carrito.
//Se deja el servicio para eliminar el carrito para ejecutarlo en caso de que se quisiera eliminar un usuario completo.

router.delete("/userCart/cleanCart", [isAuth], controller.cleanCart); //vacia el carrito

export default router;
