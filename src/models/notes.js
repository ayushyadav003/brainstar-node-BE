import mongoose from "mongoose";

const notes = mongoose.Schema;

const noteSchema = new notes(
  {
    note: { type: "string", required: [true, "Class title is required"] },
    teacherId :{type:"string",required:[true,"Teacher information is required"]},
    instituteId: { type: "string", required: [true, "Institue name is required"] },
    classId: { type: "string", required: [true, "Class name is required"] },
    batchId: { type: "string",required: [true, "Batch is required"]},
  },
  {
    timestamps: true,
  }
);

export const Notes = mongoose.model("Notes", noteSchema);
