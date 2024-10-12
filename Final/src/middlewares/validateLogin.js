import { httpResponse } from "../utils/httpResponse.js";
import { logger } from "../utils/logger.js";

export const validateLogin = (req, res, next) => {
  if (req.session?.info?.loggedIn === undefined) {
    res.redirect("/api/vistas");
  } else if (req.session.info && req.session.info.loggedIn) next();
  else {
    res.redirect("/api/vistas");
  }
};

export const isLogued = (req, res, next) => {
  if (req.session?.info?.loggedIn === undefined) {
    next();
  } else if (!req.session.info.loggedIn) next();
  else res.redirect("/api/vistas/profile");
};

export const isNotAuth = (req, res, next) => {
  if (!Object.hasOwn(req.session, "passport")) return next();
  if (req.session.passport && req.session.passport.user) {
    if (!req.isAuthenticated()) return next();
  }
  res.redirect("/api/vistas/profile");
};

export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  httpResponse.Forbidden(
    res,
    "attempted access without registration",
    "Please login first"
  );
};
