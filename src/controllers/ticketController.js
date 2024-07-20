import asyncHandler from "express-async-handler";
import { Ticket } from "../models/Ticket.js";

export const createTicket = asyncHandler(async (req, res) => {
  const { query, teacherId, ticketType,ticketStatus } = req.body;

  if (!query || !teacherId || !ticketType || !ticketStatus) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  const ticket = await Ticket.create({
    query,
    teacherId,
    ticketType,
    ticketStatus
  });


  return res.status(201).json({
    statusCode: 201,
    message: "Ticket created",
    data: ticket,
  });
});

export const getTickets = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;

  if (ticketId) {
    const ticket = await Ticket.findOne({ _id: ticketId });
    return res.status(201).json({
      statusCode: 201,
      message: "Ticket fetched",
      data: ticket,
    });
  }

  const ticket = await Ticket.find();

  return res.status(201).json({
    statusCode: 201,
    message: "All Ticket fetched",
    data: ticket,
  });
});

export const deleteTicket = asyncHandler(async (req, res) => {
  const {ticketId} = req.params;

  const ticket = await Ticket.findOneAndDelete({_id:ticketId});

  if(!ticket){
    return res.status(404).json({ message: `Ticket with ${ticketId} not found` });
  }

  return res.status(201).json({
    statusCode: 201,
    message: "Ticket deleted",
    data: ticket,
  });
});
