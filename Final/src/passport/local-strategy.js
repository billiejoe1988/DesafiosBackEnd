import * as services from "../services/user.services.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { httpResponse } from "../utils/httpResponse.js";

const strategyConfig = {
  usernameField: "email",
  passportField: "password",
  passReqToCallback: true,
};

const signUp = async (req, email, password, done) => {
  try {
    const user = await services.getUserByEmail(email);
    if (user) return done(null, false, { msg: "User already exists" });
    const newUser = await services.register(req.body);
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

const login = async (req, email, password, done) => {
  try {
    const userLogin = await services.login({ email, password });
    if (!userLogin) {
      req.session.destroy();
      return done(null, false, { message: "Autentication Denied" });
    }
    if (userLogin.inactive) {
      req.session.destroy();
      return done(null, false, { message: "User Inactive" });
    }
    return done(null, userLogin);
  } catch (error) {
    return done(error);
  }
};

const signUpStrategy = new LocalStrategy(strategyConfig, signUp);
const loginStrategy = new LocalStrategy(strategyConfig, login);

passport.use("register", signUpStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await services.getUserById(id);
    return done(null, user);
  } catch (error) {
    done(error);
  }
});
