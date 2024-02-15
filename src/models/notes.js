import mongoose from "mongoose";

const notes = mongoose.Schema;

const noteSchema = new notes(
  {
    title: { type: "string", required: [true, "Class title is required"] },
    institute: { type: "string", required: [true, "Class title is required"] },
    class: { type: "string", required: [true, "Class title is required"] },
    batch: { type: [String] },
  },
  {
    timestamps: true,
  }
);

export const Notes = mongoose.model("Notes", noteSchema);
