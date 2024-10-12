import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";
import { isAdmin, isAdminoOrPremium } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/validateLogin.js";
const router = Router();

router.get("/", controller.getAll);
router.get("/cat", controller.getByCategory);

router.get("/:pid", controller.getById);

router.post("/", [isAuth, isAdminoOrPremium], controller.create);

router.patch("/:pid", [isAuth, isAdminoOrPremium], controller.update);
router.delete("/:pid", [isAuth, isAdminoOrPremium], controller.remove);

router.get("/mockingproducts/get", controller.getMockingProducts);
router.post("/mockingproducts", controller.mockingProducts);

export default router;
