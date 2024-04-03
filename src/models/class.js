import mongoose from "mongoose";

const classes = mongoose.Schema;

const classesSchema = new classes(
  {
    title: { type: "string", required: [true, "Class title is required"] },
    teacherId: { type: ["string"], required: [true, "Teacher ID(s) are required"] }, // Changed to array type
    institute: {
      type: "string",
      required: [true, "Institute title is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Classes = mongoose.model("Classes", classesSchema);
