import mongoose from "mongoose";

const meetings = mongoose.Schema;
const otherSchema = mongoose.Schema({
  id: { type: String },
  title: { type: String },
});

const meetingSchema = new meetings(
  {
    topic: { type: "string", required: [true, "Class title is required"] },
    zoom_meetingId: { type: "string" },
    description: { type: "string" },
    join_url: { type: "string", required: [true, "Join url is required"] },
    start_url: { type: "string", required: [true, "Start url is required"] },
    duration: { type: "string", required: [true, "Duration is required"] },
    startTime: { type: "string", required: [true, "Start time is required"] },
    instituteId: { type: "string", required: [true, "Class Id is required"] },
    classId: {
      type: [otherSchema],
    },
    batch: {
      type: [otherSchema],
    },
  },
  {
    timestamps: true,
  }
);

export const Meeting = mongoose.model("Meetings", meetingSchema);
