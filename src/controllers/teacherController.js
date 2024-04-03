import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { Student } from "../models/student.js";
import { User } from "../models/User.js";

// Get all students
export const getAllTeachers = asyncHandler(async (req, res) => {
  const { institute, classId, batchId } = req.query;
  let query = { institute };

  if (classId) {
    query["classes.id"] = classId;
  }

  if (batchId) {
    query["batches.id"] = batchId;
  }
  const student = await Student.find(query).lean();
  if (!student?.length) {
    return res.status(400).json({ message: "No student found." });
  }

  res.status(200).json({ statusCode: 200, student });
});

// get student by ID
export const getStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params.id;
  const student = await Student.findOne({ _id: studentId })
    .select("-password")
    .lean();
  if (!student?.length) {
    return res.status(400).json({ message: "Student not found." });
  }

  res.status(200).json({ statusCode: 200, student });
});

// Create new student
export const craeteNewTeacher = asyncHandler(async (req, res) => {
  const { fullName, email, phone, batches, classes, institute } = req.body;

  if (!fullName || !email || !batches || !classes || !fee || !teacherId) {
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
    classes,
    batches,
    email,
    phone,
    role: "Student",
    fee,
    institute,
    teacherId,
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

  student.fullName = fullName;
  student.email = newEmail;

  const upadtesUser = await student.save();

  res.json({ message: `${fullName} updates successfully.`, data: upadtesUser });
});

//update attendance
export const updateAttendance = asyncHandler(async (req, res) => {
  const { studenId, date, batch } = req.body;

  let student = await Student.findOne({ _id: studenId }).exec();

  if (!student) {
    res.status(400).json({ message: "No student" });
  }
  const existingAttendance = student?.attendance?.find(
    (item) => item.date === date
  );

  if (existingAttendance) {
    const existingBatch = existingAttendance?.batch?.find(
      (item) => item.batchId === batch.batchId
    );

    if (existingBatch) {
      existingBatch.status = batch.status;
    } else {
      batch.push({ batchId: batch.batchId, status: batch.status });
    }
  } else {
    student.attendance.push({
      date,
      batch: [{ batchId: batch.batchId, status: batch.status }],
    });
  }

  await student.save();

  res.json({ message: `Attendance updates successfully.` });
});

// delete student
export const deleteStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.body;

  const user = await Student.findOne({ _id: studentId }).lean().exec();

  if (!user) {
    res.status(400).json({ message: "User not found." });
  }

  const result = await Student.deleteOne();

  const reply = `${result.fullName} deleted successfully.`;

  console.log(reply);

  res.status(200).json({
    statusCode: 200,
    message: reply,
  });
});
