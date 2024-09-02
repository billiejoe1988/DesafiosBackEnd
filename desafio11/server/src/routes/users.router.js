import { Router } from 'express';
import * as controller from '../controllers/users.controllers.js';
import passport from 'passport'; 
import { validateLogin } from "../middlewares/validateLogin.js"; 

const router = Router();

router.get('/all', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post('/create', controller.createUser);
router.get('/', userController.getUsers)

// Rutas de autenticación y sesión
router.post('/register', passport.authenticate('register'), controller.registerResponse);
router.post('/login', passport.authenticate('login'), controller.loginResponse);
router.get("/info", validateLogin, controller.infoSession); 
router.get("/secret-endpoint", validateLogin, controller.visit); 
router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }))  

router.get('/profile', passport.authenticate( 'github' , {
    failureRedirect: '/login', 
    successRedirect: '/profile-github', 
    passReqToCallback: true
}));

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) res.send(err);
        res.redirect('/login'); 
      });
});

export default router;
