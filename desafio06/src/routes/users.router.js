import { Router } from 'express';
import * as controller from '../controllers/users.controllers.js';
import { validateLogin } from "../middlewares/validateLogin.js"; 
import passport from 'passport';
import { registerResponse, loginResponse, githubResponse } from '../controllers/user.controller.js';

const router = Router();

router.get('/all', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post('/login', passport.authenticate('login'), loginResponse);
router.post('/register', passport.authenticate('register'), registerResponse)
router.get("/info", validateLogin, controller.infoSession); 
router.get("/secret-endpoint", validateLogin, controller.visit); 
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) res.send(err);
        res.redirect('/login'); 
      });
});
router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }))  
router.get('/profile', passport.authenticate( 'github' , {
    failureRedirect: '/login', 
    successRedirect: '/profile-github', 
    passReqToCallback: true
}));

export default router;
