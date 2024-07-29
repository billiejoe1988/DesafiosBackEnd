import UserDao from '../daos/mongodb/user.dao.js';
const userDao = new UserDao();
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const signup = async (req, email, password, done) =>{
    try {
        const user = await userDao.getByEmail(email);
        if(user) return done(null, false);
        const newUser = await userDao.createUser(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, email, password, done) =>{
    const user = { email, password };
    const userLogin = await userDao.loginUser(user);
    if(!userLogin) return done(null, false);
    return done(null, userLogin);
};

const signupStrategy = new LocalStrategy(strategyOptions, signup);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use('register', signupStrategy);
passport.use('login', loginStrategy);

// Registra al user en req.session.passport
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async(id, done) => {
    const user = await userDao.getById(id);
    return done(null, user);
});
