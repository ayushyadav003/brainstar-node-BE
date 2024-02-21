import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { Student } from "../models/student.js";
import { User } from "../models/User.js";

// Get all students
export const getAllStudents = asyncHandler(async (req, res) => {
  const student = await Student.find().lean();
  if (!student?.length) {
    return res.status(400).json({ message: "Students not found." });
  }
  res.json(student);
});

// get student by ID
export const getStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params.id;
  const student = await Student.findOne({ _id: studentId }).lean();
  if (!student?.length) {
    return res.status(400).json({ message: "Student not found." });
  }
  res.json(student);
});

// Create new student
export const craeteNewStudent = asyncHandler(async (req, res) => {
  const { fullName, email, phone, fee, batch, classes, role } = req.body;

  if (!fullName || !email || !batch || !classes || !fee) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  const duplicate = await Student.findOne({ email }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "Student with this email already exist." });
  }

  const hashedPassword = await bcrypt.hash(email.slice(0, 4) + "@" + 325, 10); //salt rounds
  const studentObject = {
    fullName,
    class: classes,
    batches: batch,
    email,
    phone,
    role: "Student",
    fee,
    password: hashedPassword,
  };

  const student = await Student.create(studentObject);

  if (student) {
    res.status(201).json({
      statusCode: 201,
      message: "Student created successfully and password sent to their email.",
      data: student,
    });
  } else {
    res
      .status(400)
      .json({ statusCode: 400, message: "Invalid user data receives." });
  }
});

// update student
export const updateStudent = asyncHandler(async (req, res) => {
  const { fullName, email, role, password } = req.body;

  const student = await Student.findOne({ email }).exec();

  if (!student) {
    res.send(400).json({ message: "No student found with this email." });
  }
  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate && duplicate.email.toString() !== email) {
    return res
      .status(400)
      .json({ message: "User already exist with this email." });
  }

  student.fullname = fullName;
  student.email = newEmail;

  const upadtesUser = await student.save();

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
