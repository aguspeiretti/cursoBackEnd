import { Router } from "express";
import passport from "passport";
import UserManager from "../dao/mongo/managers/users.js";
import {
  createHash,
  generateToken,
  passportCall,
  validatePassword,
} from "../utils.js";
import { authToken } from "../middlewares/jwtAuth.js";
const userManager = new UserManager();

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "registerFail",
  }),
  async (req, res) => {
    try {
      res.send({ status: "success", messages: "registered" });
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/registerFail", (req, res) => {
  res.status(400).send({ status: "error", error: req.session.messages });
});

router.post("/login", passportCall("login"), async (req, res) => {
  const user = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  };
  const accessToken = generateToken(user);
  res.cookie("authTocken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24,
    signed: true,
    httpOnly: true,
  });
  res.send({ status: "success", message: "Logueado " });
});

router.post("/logout", (req, res) => {
  // Destruye la sesión
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al destruir la sesión:", err);
      return res
        .status(500)
        .send({ status: "error", error: "Error al cerrar sesión" });
    }

    res.send({ status: "success", message: "Sesión cerrada correctamente" });
  });
});

router.get("/github", passportCall("github"), (req, res) => {});

router.get("/githubcallback", passportCall("github"), (req, res) => {
  const user = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  };
  const accessToken = generateToken(user);
  res.cookie("authTocken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24,
    signed: true,
    httpOnly: true,
  });
  res.redirect("/");
});

router.post("/jwtLogin", async (req, res) => {});

router.get("/jwtProfile", authToken, async (req, res) => {
  console.log(req.user);
  res.send({ status: "success", payload: req.user });
});

router.post("/restorePassword", async (req, res) => {
  const { email, password } = req.body;

  const user = await userManager.getUsersBy({ email });

  if (!user)
    return res
      .status(400)
      .send({ status: "error", error: "Usuario no encontrado" });
  const isSamePassword = await validatePassword(password, user.password);

  if (isSamePassword)
    return res.status(400).send({
      status: "error",
      error: "Error al remplazar el password no puede ser la misma",
    });
  const newHassedPassword = await createHash(password);
  try {
    await userManager.updateOne(
      { email },
      { $set: { password: newHassedPassword } }
    );
  } catch (error) {
    console.log(error);
  }

  return res.send({ status: "success", messages: "reestablecida" });
});
export default router;
