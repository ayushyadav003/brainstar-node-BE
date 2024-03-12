import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const student = mongoose.Schema;
const attendanceSchema = mongoose.Schema({
  date: { type: Date },
  day: { type: String },
  status: { type: String },
});
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
    classes: {
      id: { type: String, required: true },
      title: { type: String, required: true },
    },
    batches: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
      },
    ],
    fee: {
      type: Number,
    },
    attendance: {
      type: [attendanceSchema],
    },
    password: {
      type: String,
      require: true,
    },
    institute: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export const attendance = mongoose.model("Attendance", studentSchema);
