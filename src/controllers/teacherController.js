import asyncHandler from "express-async-handler";
import { Student } from "../models/student.js";
import nodeMailer from "nodemailer";
import { Teacher } from "../models/teacher.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

// Get all teachers
export const getAllTeachers = asyncHandler(async (req, res) => {
  const { instituteId, classId, batchId } = req.query;
  let query = { instituteId };

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

// get teacher by ID
export const getTeacher = asyncHandler(async (req, res) => {
  const { studentId } = req.params.id;
  const student = await Student.findOne({ _id: studentId })
    .select("-password")
    .lean();
  if (!student?.length) {
    return res.status(400).json({ message: "Student not found." });
  }

  res.status(200).json({ statusCode: 200, student });
});

// Create new teacher
export const createNewTeacher = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, instituteId } = req.body;

  if (!fullName || !email || !instituteId || !phoneNumber) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  const duplicate = await Teacher.findOne({ email }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "Teacher with this email already exist." });
  }

  const password = uuidv4();
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const teacherObj = {
    fullName,
    email,
    phoneNumber,
    instituteId,
    password: hashedPassword,
  };

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "rs20021023@gmail.com",
      pass: "sjpg crnj kpto xgoq",
    },
  });

  const mailOptions = {
    from: {
      name: "Brainster",
      address: "rs20021023@gmail.com",
    },
    to: email,
    subject: "Teacher registered",
    html: `
    <p>Congratulations you have been registered as a teacher</p>
    <p>password-${password}
    <p>Ignore this mail if you haven't tried to register on Brainster</p>`,
  };

  await transporter.sendMail(mailOptions);

  const teacher = await Teacher.create(teacherObj);

  if (teacher) {
    res.status(201).json({
      statusCode: 201,
      message: "Teacher created successfully password is sent to mail",
      data: teacher,
    });
  } else {
    res
      .status(400)
      .json({ statusCode: 400, message: "Invalid user data receives." });
  }
});

// update new teacher
export const updateTeacher = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, instituteId } = req.body;

  if (!fullName || !email || !instituteId || !phoneNumber) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  const duplicate = await Teacher.findOne({ email }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "Teacher with this email already exist." });
  }

  const password = uuidv4();
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const teacherObj = {
    fullName,
    email,
    phoneNumber,
    instituteId,
    password: hashedPassword,
  };

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "rs20021023@gmail.com",
      pass: "sjpg crnj kpto xgoq",
    },
  });

  const mailOptions = {
    from: {
      name: "Brainster",
      address: "rs20021023@gmail.com",
    },
    to: email,
    subject: "Teacher registered",
    html: `
    <p>Congratulations you have been registered as a teacher</p>
    <p>password-${password}
    <p>Ignore this mail if you haven't tried to register on Brainster</p>`,
  };

  await transporter.sendMail(mailOptions);

  const teacher = await Teacher.create(teacherObj);

  if (teacher) {
    res.status(201).json({
      statusCode: 201,
      message: "Teacher created successfully password is sent to mail",
      data: teacher,
    });
  } else {
    res
      .status(400)
      .json({ statusCode: 400, message: "Invalid user data receives." });
  }
});

// delete teacher
export const deleteTeacher = asyncHandler(async (req, res) => {
  const { teacherId } = req.body;

  const user = await Teacher.findOne({ _id: teacherId }).lean().exec();

  if (!user) {
    res.status(400).json({ message: "User not found." });
  }

  const result = await Student.deleteOne();

  const reply = `${result.fullName} deleted successfully.`;

  res.status(200).json({
    statusCode: 200,
    message: reply,
  });
});
