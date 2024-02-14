import mongoose from "mongoose";

const batches = mongoose.Schema;

const batchesSchema = new batches(
  {
    title: { type: "string", required: [true, "Bathc title is required"] },
    class: { type: "string", required: [true, "Class is required"] },
    institute: { type: "string", required: [true, "Class title is required"] },
  },
  {
    timestamps: true,
  }
);

export const Batch = mongoose.model("Batches", batchesSchema);
