export default class TicketService {
  constructor(dao) {
    this.dao = dao;
  }
  getTicketsService = () => {
    return this.dao.getTickets();
  };
  getTicketsByIdService = (tid) => {
    return this.dao.getTicketsById();
  };
  createTicketsService = (ticket) => {
    return this.dao.createTickets(ticket);
  };
  deleteTicketsService = () => {
    return this.dao.deleteTickets();
  };
}
