import { createHash, generateToken, validatePassword } from "../utils.js";
import { userService } from "../services/index.js";
import restoreTokenDTO from "../dtos/user/restoreTokenDTO.js";
import mailService from "../services/mailingService.js";
import DTemplates from "../constants/DTemplates.js";
import jwt, { verify } from "jsonwebtoken";

const registerPost = async (req, res) => {
  const mailingService = new mailService();
  try {
    const result = await mailingService.sendMail(
      req.user.email,
      DTemplates.HOLA,
      { user: req.user }
    );
    console.log(result);
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
  if (req.error) {
    res.send({ status: "error", error: req.error });
    req.logger.error(`logger login.Usuario no agregado: ${req.error}`);
  }
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

const restoreRequest = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).send({ status: "error usuario no encontrado" });

  const user = await userService.getUsersByService({ email });
  if (!user)
    return res.status(400).send({ status: "error usuario no encontrado " });

  //creamos el restore toquen
  const restoreToken = generateToken(restoreTokenDTO.getForm(user), 30);
  const mailingService = new mailService();
  const result = await mailingService.sendMail(user.email, DTemplates.RESTORE, {
    restoreToken,
  });
  res.send({ status: "success" });
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

const restorePassword = async (req, res) => {
  const { password, token } = req.body;
  try {
    const tokenUser = jwt.verify(token, "jwtSecret");
    console.log(tokenUser);
    const user = await userService.getUsersByService({
      email: tokenUser.email,
    });
    console.log(user);
    //verificar si la clave no es la misma
    const isSamePassword = await validatePassword(password, user.password);
    console.log(isSamePassword);
    if (isSamePassword) return res.send({ status: 400 });
    const newHassedPassword = await createHash(password);
    console.log(newHassedPassword);
    await userService.updateOneService(
      { email: user.email },
      { $set: { password: newHassedPassword } }
    );
    res.send({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};

export default {
  registerPost,
  getRegisterFail,
  loginPost,
  logOutPost,
  githubCallback,
  restorePaswordPost,
  restoreRequest,
  restorePassword,
};
