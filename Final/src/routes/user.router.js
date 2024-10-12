import { Router } from "express";
import { isAuth, isLogued } from "../middlewares/validateLogin.js";
import * as controller from "../controllers/user.controllers.js";
import passport from "passport";
import { isAdmin } from "../middlewares/isAdmin.js";
import { uploader } from "../middlewares/multer.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register"),
  controller.register
);
router.post("/login", passport.authenticate("login"), controller.login);
router.get("/current", [isAuth], controller.current);
router.get("/infoSession", [isAuth, isAdmin], controller.infoSession);

router.get("/logout", [isAuth], controller.logout);

router.get(
  "/register-github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/profile",
  passport.authenticate("github", { scope: ["user:email"] }),
  controller.githubResponse
);
router.post(
  "/profile",
  [isAuth, uploader.single("profile")],
  controller.updProfile
);
router.post(
  "/documents",
  [isAuth, uploader.single("documents")],
  controller.updProfile
);
router.post(
  "/products",
  [isAuth, uploader.single("products")],
  controller.updProfile
);

router.get("/send-reset-mail", [isAuth], controller.sendResetPassMail);
router.get("/getCookie", [isAuth], controller.getCookie);
router.patch("/update-password", [isAuth], controller.updatePass);
router.patch("/update-user", [isAuth], controller.update);
router.patch("/premium", [isAuth], controller.updatePremium);
router.get("/", [isAuth, isAdmin], controller.getAll);
router.get("/set_inactive", [isAuth, isAdmin], controller.setInactive);
router.post("/set_active", [isAuth, isAdmin], controller.setActive);

export default router;
