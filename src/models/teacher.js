import mongoose from "mongoose";

const teacher = mongoose.Schema;
const teacherSchema = new teacher(
  {
    fullName: { type: String, required: [true, "Full name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      unique: true,
    },
    classes: {
      type: [String],
      require: [true, "Batch is required"],
      unique: true,
    },
    batches: {
      type: [String],
      require: [true, "Batch is required."],
    },
  },
  {
    timestamps: true,
  }
);

export const Teacher = mongoose.model("Teachers", teacherSchema);
