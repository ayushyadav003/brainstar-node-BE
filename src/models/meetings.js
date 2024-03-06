import mongoose from "mongoose";

const meetings = mongoose.Schema;

const meetingSchema = new meetings(
  {
    title: { type: "string", required: [true, "Class title is required"] },
    institute: { type: "string", required: [true, "Class title is required"] },
  },
  {
    timestamps: true,
  }
);

export const meeting = mongoose.model("Meetins", meetingSchema);
