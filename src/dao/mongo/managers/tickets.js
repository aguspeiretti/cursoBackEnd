import ticketModel from "../models/ticket.js";

export default class TicketManager {
  getTickets = async () => {
    return ticketModel.find().lean();
  };
  getTicketsById = async (tid) => {
    return ticketModel.findById(tid);
  };
  createTickets = async () => {
    return ticketModel.create();
  };
  deleteTickets = async (tid) => {
    try {
      const deletedTicket = await ticketModel.findByIdAndDelete(tid);

      if (!deletedTicket) {
        throw new Error("ticket no encontrado");
      }

      return deletedTicket;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
