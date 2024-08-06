import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const superAdmin = mongoose.Schema;

const superAdminSchema = new superAdmin(
  {
    fullName: { type: String, required: [true, "Full name is required"] },
    instituteName: {
      type: String,
      required: [true, "Institue name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Email is required"],
    },
    Role: {
      type: "String",
      required: ["Role is required"],
      default: "superAdmin",
    },
  },
  {
    timestamps: true,
  }
);

export const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);
