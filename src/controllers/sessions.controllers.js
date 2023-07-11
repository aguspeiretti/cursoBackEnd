import { createHash, generateToken, validatePassword } from "../utils.js";
import { userService } from "../services/index.js";

const registerPost = async (req, res) => {
  try {
    res.send({ status: "success", messages: "registered" });
  } catch (error) {
    console.log(error);
  }
};

const getRegisterFail = async (req, res) => {
  res.status(400).send({ status: "error", error: req.session.message });
};

const loginPost = async (req, res) => {
  const user = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    cart: req.user.cart,
  };
  const accessToken = generateToken(user);
  res.cookie("authToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send({ status: "success", payload: user });
};

const logOutPost = async (req, res) => {
  res.clearCookie("authToken"); // Eliminar la cookie "authToken"
  res.send({ status: "success", message: "Sesión cerrada correctamente" });
};

const githubCallback = (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.first_name,
    email: req.user.email,
    role: req.user.role,
  };
  const accessToken = generateToken(user);

  res.cookie("authToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.redirect("/");
};

const restorePaswordPost = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.getUsersByService({ email });

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
    await userService.updateOneService(
      { email },
      { $set: { password: newHassedPassword } }
    );
  } catch (error) {
    console.log(error);
  }

  return res.send({ status: "success", messages: "reestablecida" });
};

export default {
  registerPost,
  getRegisterFail,
  loginPost,
  logOutPost,
  githubCallback,
  restorePaswordPost,
};
