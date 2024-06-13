import { Router } from 'express';
import * as controller from '../controllers/users.controllers.js';
import { validateLogin } from "../middlewares/validateLogin.js"; 

const router = Router();

router.get('/all', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post("/login", controller.login);
router.post('/register', controller.register);
router.get("/info", validateLogin, controller.infoSession); 
router.get("/secret-endpoint", validateLogin, controller.visit); 
router.post("/logout", controller.logout);

export default router;
