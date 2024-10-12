import * as services from "../services/user.services.js";
import { httpResponse } from "../utils/httpResponse.js";
import {
  createHash,
  hasBeenMoreThanXTime,
  isValidPassword,
} from "../utils/utils.js";
import { sendGmail } from "./email.controllers.js";
import { logger } from "../utils/logger.js";
import { UserLiteDTO } from "../dto/user.dto.js";
import persistence from "../daos/factory.js";
const { userDao } = persistence;

export const register = async (req, res, next) => {
  try {
    const userId = req.session.passport?.user;
    if (userId) {
      const user = await services.getUserById(userId);
      req.session.message = user;
      req.session.emailType = "register";
      await sendGmail(req, res, next);
      httpResponse.Ok(res, user);
    } else {
      httpResponse.Unauthorized(res, user, "User not logued");
    }
  } catch (error) {
    next(error.message);
  }
};
export const login = async (req, res, next) => {
  try {
    let id = null;
    if (req.session.passport && req.session.passport.user)
      id = req.session.passport.user;
    const user = await services.getUserById(id);
    if (!user) {
      req.session.error = "Usuario o mail incorrecto";
      httpResponse.NotFound(res, user, req.session.error);
    } else {
      const {
        first_name,
        last_name,
        email,
        age,
        role,
        cart,
        last_connection,
        documents,
        status,
        inactive,
      } = user;

      const message = {
        msg: {
          first_name,
          last_name,
          email,
          age,
          role,
          cart,
          last_connection,
          documents,
          status,
          inactive,
        },
      };
      req.session.message = message.msg;
      req.session.info = {
        loggedIn: true,
        contador: 1,
      };
      req.session.emailType = "login";
      sendGmail(req, res, next);

      httpResponse.Ok(res, req.session);
    }
  } catch (error) {
    console.log(error.message);
    next(error.message);
  }
};

export const infoSession = async (req, res, next) => {
  const userId = req.session.passport?.user;
  if (userId) {
    const user = await services.getUserById(userId);
    const { first_name, last_name, email, age, role, cart } = user;
    const isAdmin =
      email === "adminCoder@coder.com" ? { role: "admin" } : { role: role };
    const message = {
      msg: { first_name, last_name, email, age, role, cart, ...isAdmin },
    };
    req.session.message = message.msg;
  }
  httpResponse.Ok(res, {
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
  });
};

export const logout = async (req, res, next) => {
  //res.clearCookie("connect.sid");
  //res.clearCookie("product"); para eliminar cookies
  req.session.destroy();

  httpResponse.Ok(res, "", "session cerrada correctamente");

  // res.redirect("/api/vistas");
};

export const githubResponse = async (req, res, next) => {
  try {
    const { first_name, last_name, email, role, isGithub, age = 18 } = req.user;
    const message = {
      msg: { first_name, last_name, email, age, role, isGithub },
    };
    req.session.message = message.msg;
    req.session.info = {
      loggedIn: true,
      contador: 1,
    };
    httpResponse.Ok(res, req.session);
    //res.redirect("/api/vistas/products?limit=3&page=1");
  } catch (error) {
    next(error);
  }
};

export const current = async (req, res, next) => {
  try {
    const userId = req.session.passport?.user;
    if (userId) {
      const user = await services.getUserById(userId);
      req.session.message = user;
      httpResponse.Ok(res, user);
    } else {
      httpResponse.Unauthorized(res, user, "User not logued");
    }
  } catch (error) {
    next(error);
  }
};
export const getAll = async (req, res, next) => {
  try {
    const users = await services.getAll();

    if (users) {
      req.session.message = users;
      httpResponse.Ok(res, users);
    } else {
      httpResponse.Unauthorized(res, users, "User not logued");
    }
  } catch (error) {
    next(error);
  }
};
export const setInactive = async (req, res, next) => {
  try {
    const inactiveUsers = [];
    const users = await services.getAllComplete();

    if (users.length > 0) {
      for (const user of users) {
        if (
          user.last_connection &&
          hasBeenMoreThanXTime(user.last_connection) &&
          user.role !== "admin"
        ) {
          logger.info(
            `${user.email}, Han pasado mas de 48hs de la ultima conexión, se ha desactivado el usuario id: ${user._id}`
          );

          await services.update(user._id, {
            inactive: true,
          });
          req.session.emailType = "inactive";
          req.session.message.first_name = user.first_name;
          req.session.message.email = user.email;
          sendGmail(req, res, next);
          inactiveUsers.push(user.email);
        }
      }
      req.session.message = inactiveUsers;
      return httpResponse.Ok(res, "completing inactive users", inactiveUsers);
    } else {
      return httpResponse.NotFound(
        res,
        inactiveUsers,
        "Not users for Set inactive"
      );
    }
  } catch (error) {
    next(error);
  }
};
export const setActive = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await services.getUserByEmail(email);

    if (!user) {
      return httpResponse.NotFound(res, user, "Not a valid email");
    } else {
      await services.update(user._id, {
        inactive: false,
      });
      const liteUser = new UserLiteDTO(user);
      return httpResponse.Ok(res, "User reactivated", liteUser);
    }
  } catch (error) {
    next(error);
  }
};

export const updProfile = async (req, res, next) => {
  try {
    const { documents, email } = req.session?.message;
    const id = req.session.passport.user;
    const document = {
      type: req.file.fieldname,
      name: req.file.filename,
      reference: req.file.path,
    };
    const existProfile = documents.findIndex(
      ({ type }) => type == req.file.fieldname
    );
    if (existProfile === -1) documents.push(document);
    else documents.splice(existProfile, 1, document);

    const user = await services.updateProfile(id, documents);
    if (user.documents.length === 3) {
      const status = await services.update(id, { status: true });
      req.session.message.status = status;
    }
    if (!user) return httpResponse.NotFound(res, user, "Not found");
    return httpResponse.Ok(
      res,
      documents,
      `${req.file.fieldname} Image uploaded`
    );
  } catch (error) {
    res.json(error.message);
  }
};
export const sendResetPassMail = async (req, res, next) => {
  try {
    const token = createHash("hola");
    const user = req.session?.message;
    res.cookie("token", token, { maxAge: 60000 });
    req.session.emailType = "reset";
    sendGmail(req, res, next);
    httpResponse.Ok(res, "cookie generada");
  } catch (error) {
    next(error);
  }
};
export const getCookie = async (req, res, next) => {
  try {
    //const user = req.session.message;
    const { token } = req.cookies;
    if (!token)
      return httpResponse.Forbidden(res, "Token expires, get a new token");
    return httpResponse.Ok(res, token);
  } catch (error) {
    next(error);
  }
};
export const updatePass = async (req, res, next) => {
  try {
    const id = req.session?.passport?.user;
    const { token } = req.cookies;
    if (!token)
      return httpResponse.Forbidden(res, "Token expires, get a new token");

    const user = await userDao.getById(id);
    const { password } = user;
    const { newPassword } = req.body;
    const samePass = isValidPassword(newPassword, password);

    if (samePass)
      return httpResponse.Unauthorized(res, "you can not repeat a password");

    const hashPass = createHash(newPassword);
    const resp = await services.resetPassword(id, hashPass);
    res.clearCookie("token");
    req.session.emailType = "passwordRestored";
    sendGmail(req, res, next);
    return httpResponse.Ok(res, resp);
  } catch (error) {
    next(error);
  }
};
export const update = async (req, res, next) => {
  try {
    const id = req.session?.passport?.user;
    const newUserData = req.body;
    const { first_name, last_name, age } = newUserData;
    const newData = { first_name, last_name, age };
    const user = await services.update(id, newData);
    req.session.message = user;
    req.session.emailType = "updateUser";
    sendGmail(req, res, next);
    return httpResponse.Ok(res, user);
  } catch (error) {
    next(error);
  }
};
export const updatePremium = async (req, res, next) => {
  try {
    const id = req.session?.passport?.user;
    const user = await userDao.getById(id);
    const { status } = user || false;

    let role = req.session?.message.role;
    if (role === "user") {
      if (status === true) {
        role = "premium";
      } else {
        return httpResponse.Unauthorized(
          res,
          status,
          "You need upload all de documents for be an Premium user"
        );
      }
    } else if (role === "premium") {
      role = "user";
    }

    const newUser = await services.update(id, { role });
    req.session.message = newUser;
    role === "premium" && (req.session.emailType = "rolePremium");
    role === "user" && (req.session.emailType = "roleUser");
    sendGmail(req, res, next);
    return httpResponse.Ok(res, newUser);
  } catch (error) {
    next(error);
  }
};
