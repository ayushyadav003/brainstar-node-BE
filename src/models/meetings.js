import mongoose from "mongoose";

const meetings = mongoose.Schema;

const meetingSchema = new meetings(
  {
    topic: { type: "string", required: [true, "Class title is required"] },
    zoom_meetingId: { type: "string" },
    description: { type: "string" },
    join_url: { type: "string", required: [true, "Join url is required"] },
    start_url: { type: "string", required: [true, "Start url is required"] },
    instituteid: {
      type: "string",
      required: [true, "Class title is required"],
    },
    duration: { type: "string", required: [true, "Duration is required"] },
    startTime: { type: "string", required: [true, "Start time is required"] },
    classId: { type: "string", required: [true, "Class Id is required"] },
    batchId: { type: "string", required: [true, "Batch Id is required"] },
  },
  {
    timestamps: true,
  }
);

export const meeting = mongoose.model("Meetings", meetingSchema);
