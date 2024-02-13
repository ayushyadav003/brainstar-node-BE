import mongoose from "mongoose";

const ticket = mongoose.Schema;

const ticketSchema = new batches(
  {
    title: { type: "string", required: [true, "Bathc title is required"] },
    timing: { type: "string" },
    class: { type: "string", required: [true, "Class is required"] },
    institute: { type: "string", required: [true, "Class title is required"] },
  },
  {
    timestamps: true,
  }
);

export const BatchModel = mongoose.model("Batches", batchesSchema);
