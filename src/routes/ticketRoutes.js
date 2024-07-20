import express from "express";
import {
  createTicket,
  deleteTicket,
  getTickets,
} from "../controllers/ticketController.js";

const ticketRouter = express.Router();

ticketRouter.route("/").get(getTickets).post(createTicket);

ticketRouter
  .route("/:ticketId")
  .get(getTickets)
  .delete(deleteTicket);

export default ticketRouter;
