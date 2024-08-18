import mongoose from "mongoose";

const { Types } = mongoose;
const { ObjectId } = Types;
const student = mongoose.Schema;
const studentSchema = new student(
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
    studentClass: {
      type: Number,
      require: [true, "Class is required"],
      unique: true,
    },
    batches: {
      type: [String],
      require: [true, "Batch is required."],
    },
    role: {
      type: String,
      required: ["Role is required"],
      default: "student",
    },
    password: {
      type: String,
      required: ["Pasword is required"],
    },
    instituteId: {
      type: ObjectId,
      ref: "SuperAdmin",
      require: ["Institue Id is required"],
    },
    teacherId: {
      type: ObjectId,
      ref: "Teacher",
      require: ["Institue Id is required"],
    },
    fee: {
      type: Number,
      require: ["Fee is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Students", studentSchema);
