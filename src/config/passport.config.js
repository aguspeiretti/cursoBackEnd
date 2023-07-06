import passport from "passport";
import local from "passport-local";
import { cookieExtractor, createHash, validatePassword } from "../utils.js";
import UserManager from "../dao/mongo/managers/users.js";
import GithubStrategy from "passport-github2";
import { ExtractJwt, Strategy } from "passport-jwt";
import CartsManager from "../dao/mongo/managers/cart.js";
import config from "./config.js";

const userManager = new UserManager();
const cartManager = new CartsManager();

const LocalStrategy = local.Strategy;

const initializePassportStrategies = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name } = req.body;
          //Número 1! Corrobora si el usuario ya existe.
          const exists = await userManager.getUsersBy({ email });
          //done lo que quiere hacer es DEVOLVERTE un usuario en req.user;
          const cart = await cartManager.createCart();
          if (exists)
            return done(null, false, { message: "El usuario ya existe" });
          //Número 2! Si el usuario no existe, ahora sí ENCRIPTAMOS SU CONTRASEÑA
          const hashedPassword = await createHash(password);
          //Número 3! Construimos el usuario que voy a registrar
          const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            cart: cart._id,
          };
          const result = await userManager.createUsers(user);
          // Si todo salió bien, Ahí es cuando done debe finalizar bien.
          done(null, result);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        // PASSPORT SÓLO DEBE DEVOLVER AL USUARIO FINAL, ÉL NO ES RESPONSABLE DE LA SESIÓN
        if (email === config.adminName && password === config.adminPasword) {
          //Desde aquí ya puedo inicializar al admin.
          const user = {
            id: 0,
            name: `Coder admin`,
            role: "admin",
            email: "...",
          };
          return done(null, user);
        }
        let user;
        //  Número 1!!!!! buscar al usuario, ¿existe?
        user = await userManager.getUsersBy({ email }); //Sólo busco por mail
        if (!user)
          return done(null, false, { message: "Credenciales incorrectas" });

        // Número 2!!!! si sí existe el usuario, VERIFICA SU PASSWORD ENCRIPTADO

        const isValidPassword = await validatePassword(password, user.password);
        if (!isValidPassword)
          return done(null, false, { message: "Contraseña inválida" });

        //Número 3!!! ¿El usuario existe y SÍ PUSO SU CONTRASEÑA CORRECTA? Como estoy en passport, sólo devuelvo al usuario

        user = {
          id: user._id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role,
        };
        return done(null, user);
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.4c2c3b263793da3f",
        clientSecret: "59ea5802ff1ff72b38261bdb1c78a63e45d43f26",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          const { name } = profile._json;

          let emailGitHub = `${profile._json.login}@github.com`;

          const user = await userManager.getUsersBy({ email: emailGitHub });

          if (!user) {
            const newUser = {
              first_name: name,
              email: emailGitHub,
              password: "",
            };
            const result = await userManager.createUsers(newUser);
            return done(null, result);
          }
          // si ya existe

          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "jwtSecret",
      },
      async (payload, done) => {
        return done(null, payload);
      }
    )
  );
};
export default initializePassportStrategies;
