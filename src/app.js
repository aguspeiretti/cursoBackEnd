import express from "express";
import ProductsRouter from "./routes/products.mongoose.router.js";
import CartsRouter from "./routes/carts.mongo.router.js";
import TicketRouter from "./routes/tickets.mongo.router.js";
import sessionRouter from "./routes/session.router.js";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.routes.js";
import mockingRouter from "./routes/mocking.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import ProductsManager from "./dao/mongo/managers/productManager.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import messagesModel from "./dao/mongo/models/messages.js";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import nodemailer from "nodemailer";
import twilio from "twilio";
import errorHandler from "./middlewares/error.js";
import attachLogger from "./middlewares/logger.js";
import loggerRouter from "./routes/logger.router.js";

const app = express();

app.use(attachLogger);
const url = config.mongoUrl;
const connection = mongoose.connect(url);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(cookieParser());

initializePassport();

const PORT = config.port || 8080;
const server = app.listen(PORT, () => console.log("escuchando"));
const io = new Server(server);

app.use("/", loggerRouter);
app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);
app.use("/api/tickets", TicketRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/mockingproducts", mockingRouter);
app.use("/", viewsRouter);
app.use(errorHandler);

io.on("connection", async (socket) => {
  console.log("nuevo cliente conectado");
  const productManager = new ProductsManager();
  const products = await productManager.getProducts();
  socket.emit("updateProducts", products);
});

const messages = [];

io.on("connection", async (socket) => {
  console.log("Nuevo socket conectado");
  try {
    // Obtén todos los mensajes existentes desde MongoDB
    const messages = await messagesModel.find({}).lean().exec();
    socket.emit("logs", messages);
  } catch (error) {
    console.error("Error al obtener mensajes desde MongoDB:", error);
  }
  socket.on("message", async (data) => {
    try {
      // Crea un nuevo documento en MongoDB con el mensaje recibido
      const message = await messagesModel.create(data);
      // Agrega el nuevo mensaje al array en memoria
      messages.push(message);
      // Emite los mensajes actualizados a todos los clientes conectados
      io.emit("logs", messages);
    } catch (error) {
      console.error("Error al crear el mensaje en MongoDB:", error);
    }
  });
  socket.on("authenticated", (data) => {
    socket.broadcast.emit("newUserConnected", data);
  });
});

// //esto va en el env
// const APP_PASSWORD = "myohssdwcyqmilmu";
// const APP_EMAIL = "agupeiretti@gmail.com";

// //general el vinculo entre el servicio seleccionado y mi herramienta
// const transport = nodemailer.createTransport({
//   service: "gmail",
//   port: 587,
//   auth: {
//     user: APP_EMAIL,
//     pass: APP_PASSWORD,
//   },
// });

// app.get("/email", async (req, res) => {
//   const result = await transport.sendMail({
//     from: "agus <agupeiretti@hotmail.com>",
//     to: "agupeiretti@hotmail.com",
//     subject: "correo de prueba",
//     html: `
//     <div><h1>!alto ahi esto es una prueba</h1></div>
//     `,

//   });
//   res.send({ status: "success", payload: result });
// });

//TWILIO

// const TWILIO_NUMBER = "+16203203268";
// const TWILIO_ID = "ACebe07a3c15effe8d1f831965db466e6c";
// const TWILIO_TOKEN = "2c9320d1f4294ef763ed7bc5aca9233f";

// const twilioClient = twilio(TWILIO_ID,TWILIO_TOKEN)

// app.get("/sms", async (req, res) => {
//   const clientNumber = "+543518015096"
//   const result = await twilioClient.messages.create({
//     body:"Hola desde el back",
//     from:TWILIO_NUMBER,
//     to:clientNumber

//   })
//   res.send({status:"success" , payload:result})
// });

//implementar DTO
