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
  createTicketsService = () => {
    return this.dao.createTickets();
  };
  deleteTicketsService = () => {
    return this.dao.deleteTickets();
  };
}
