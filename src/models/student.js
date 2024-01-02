import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN = {
  secret: process.env.AUTH_ACCESS_TOKEN_SECRET,
  expiry: process.env.AUTH_ACCESS_TOKEN_EXPIRY,
};
const REFRESH_TOKEN = {
  secret: process.env.AUTH_REFRESH_TOKEN_SECRET,
  expiry: process.env.AUTH_REFRESH_TOKEN_EXPIRY,
};
const RESET_PASSWORD_TOKEN = {
  expiry: process.env.RESET_PASSWORD_TOKEN_EXPIRY_MINS,
};

const student = mongoose.Schema;
const studentSchema = new student(
  {
    fullname: { type: String, required: [true, "Full name is required"] },
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
    batch: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("student", studentSchema);
