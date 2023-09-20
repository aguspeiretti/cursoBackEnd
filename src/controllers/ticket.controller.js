import DTemplates from "../constants/DTemplates.js";
import { cartService, ticketService } from "../services/index.js";
import mailService from "../services/mailingService.js";

const getTickets = async (req, res) => {
  const tickets = await ticketService.getTicketsService();
  res.send(tickets);
};

const getTicketsById = async (req, res) => {
  try {
    const tickets = await ticketService.getTicketsByIdService({ _id: cId });
    if (!tickets)
      res.status(404).send({ status: "error", error: "ticket not found" });
    res.send({ status: "succes", payload: tickets });
  } catch (err) {
    console.log(err);
  }
};

const createTickets = async (req, res) => {
  try {
    const ticket = await ticketService.createTicketsService(req.body);
    console.log(req.body);
    await cartService.updateProductStockService(req.body.cart);
    const clear = await cartService.deleteCartItems(req.body.cart);

    const emailService = new mailService();
    const emailResult = await emailService.sendMail(
      req.body.purchaser,
      DTemplates.CONFIRMACIONCOMPRA,
      {
        userName: req.body.purchaser,
        montoTotal: req.body.amount,
        ticketId: ticket._id,
      }
    );

    if (emailResult) {
      console.log("Correo electrónico enviado con éxito");
    } else {
      console.error("Error al enviar el correo electrónico");
    }

    res.send({ status: "success", payload: ticket });
  } catch (error) {
    console.log(error);
    return res.status(404).send({ status: "error", error: "cart not created" });
  }
};

const ticketDelete = async (req, res) => {
  try {
    const { tid } = req.params;
    const deletedTicket = await ticketService.deleteTicketsService(tid);
    res.send({ status: "success", payload: deletedTicket });
  } catch (err) {
    console.log(err);
  }
};

export default {
  getTickets,
  getTicketsById,
  createTickets,
  ticketDelete,
};
