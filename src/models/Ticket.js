import mongoose from "mongoose";

const ticket = mongoose.Schema;

const ticketSchema = new ticket(
  {
    query: { type: "string", required: [true, "Class title is required"] },
    teacherId: {
      type: "string",
      required: [true, "Teacher information is required"],
    },
    ticketType: {
      type: "string",
      required: [true, "ticket type is required"],
    },
    ticketStatus: {
      type: String,
      enum: ["Pending", "Completed"],
    },
    // instituteId: {
    //   type: "string",
    //   required: [true, "Institue name is required"],
    // },
    // classId: { type: "string", required: [true, "Class name is required"] },
    // batchId: { type: "string", required: [true, "Batch is required"] },
  },
  {
    timestamps: true,
  }
);

export const Ticket = mongoose.model("Tickets", ticketSchema);
