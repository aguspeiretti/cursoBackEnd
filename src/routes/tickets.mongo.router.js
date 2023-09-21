import { Router } from "express";
import ticketController from "../controllers/ticket.controller.js";

const router = Router();

router.get("/", ticketController.getTickets);

router.get("/:tid", ticketController.getTicketsById);

router.post("/", ticketController.createTickets);

router.delete("/:tid", ticketController.ticketDelete);

export default router;
