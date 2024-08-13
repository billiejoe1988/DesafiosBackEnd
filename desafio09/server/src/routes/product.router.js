import express from 'express';
import * as controller from "../controllers/product.controllers.js"; 
import { isAuth } from '../middlewares/isAuth.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:pid", controller.getById);
router.post("/", controller.create);
router.put("/:pid", controller.update);
router.delete("/:pid", controller.remove);

router.route('/mockingproducts')
    .post(isAuth, checkAdmin, controller.createProd)  
    .get(isAuth, checkAdmin, controller.getProds);  

export default router;