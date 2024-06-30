import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", (req, res) => {
  console.log(req.session)
res.render("profile");
});

router.get("/profile-github", isAuth, (req, res) => {
  console.log("req.user", req.user);
  const user = req.user.toObject();
  res.render("profile", { user });
});

export default router;
