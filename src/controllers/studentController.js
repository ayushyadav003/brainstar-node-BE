import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { Student, Students } from "../models/student.js";

// Get all students
export const getAllStudents = asyncHandler(async (req, res) => {
  const student = await Students.find().lean();
  if (!student?.length) {
    return res.status(400).json({ message: "Users not found." });
  }
  res.json(student);
});

// Create new student
export const createNewUser = asyncHandler(async (req, res) => {
  const { fullName, email, phone, fee, batch, classes, role } = req.body;

  if (!fullName || !email || !batch || !classes || !fee) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  const duplicate = await Students.findOne({ email }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "Student with this email already exist." });
  }

  const hashedPassword = await bcrypt.hash(password, 10); //salt rounds
  const userObject = {
    fullName,
    password: hashedPassword,
    batches: batch,
    email,
    phone,
    role,
    fee,
  };

  const student = await Student.create(userObject);

  if (student) {
    res
      .status(201)
      .json({ message: "User created successfully.", data: student });
  } else {
    res.status(400).json({ message: "Invalid user data receives." });
  }
});

// update student
export const updateUser = asyncHandler(async (req, res) => {
  const { fullName, email, newEmail, role, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    res.send(400).json({ message: "User not found." });
  }
  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate && duplicate.email.toString() !== email) {
    return res
      .status(400)
      .json({ message: "User already exist with this email." });
  }

  user.fullName = fullName;
  user.role = role;
  user.email = newEmail;

  if (password) {
    user.password = await bcrypt.hash(password, 10); //salt rounds
  }

  const upadtesUser = await user.save();

  res.json({ message: `${fullName} updates successfully.`, data: upadtesUser });
});

// delete student
export const deleteUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await Student.findOne({ email }).lean().exec();

  if (!user) {
    res.status(400).json({ message: "User not found." });
  }

  const result = await User.deleteOne();

  const reply = `${result.fullName} with email ${result.email} deleted successfully.`;
  res.json(reply);
});
