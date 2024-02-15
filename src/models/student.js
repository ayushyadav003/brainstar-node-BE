import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const student = mongoose.Schema;
const studentSchema = new student(
  {
    fullName: { type: String, required: [true, "Full name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    class: {
      type: String,
      unique: true,
    },
    batches: {
      type: [String],
      require: [true, "Batch is required."],
    },
    fee: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Students", studentSchema);
