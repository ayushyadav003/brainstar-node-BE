import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

// get all user
export const getAllUsers = asyncHandler(async (req, res) => {
  const { instituteId, userId, role } = req.body;

  //confirm data
  if (!instituteId) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "InstituteId be provided." });
  }

  let query = {
    institute: instituteId,
    role,
  };

  if (userId) {
    query.userId = userId;
  }

  const users = await User.find(query).select("-password -__v").lean();

  if (users) {
    res.status(200).json({
      statusCode: 201,
      message: "User created successfully.",
      data: users,
    });
  } else {
    res
      .status(400)
      .json({ statusCode: 400, message: "Invalid user data receives." });
  }
});

// Create new user
export const createNewUser = asyncHandler(async (req, res) => {
  const { ownerName, instituteName, password, email, phone, role } = req.body;

  //confirm data
  if (!ownerName || !instituteName || !email || !role) {
    return res
      .status(200)
      .json({ statusCode: 400, message: "All fields must be provided." });
  }

  //check for duplicate
  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res.status(200).json({
      statusCode: 409,
      message: `${
        role === "teacher" ? "Teacher" : "User"
      } with this email already exist.`,
    });
  }
  let hashedPassword;
  if (role === "teacher") {
    hashedPassword = await bcrypt.hash(
      fullName.slice(0, 3) + "@" + phone.slice(6, 10),
      10
    ); //salt rounds
  } else {
    hashedPassword = await bcrypt.hash(password, 10); //salt rounds
  }
  const userObject = {
    fullname: ownerName,
    password: hashedPassword,
    institute: instituteName,
    instituteId: uuidv4(),
    email,
    phone,
    role,
  };

  //create and store new user
  let user = await User.create(userObject);
  if (user) {
    delete user.password;
    delete user._V;
    res.status(201).json({
      statusCode: 201,
      message: `${
        le === "teacher" ? "Teacher" : "Admin"
      } created successfully.`,
      data: user,
    });
  } else {
    res
      .status(400)
      .json({ statusCode: 400, message: "Invalid user data receives." });
  }
});

// update user
export const updateUser = asyncHandler(async (req, res) => {
  const { fullName, email, newEmail, role, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    res.send(400).json({ message: "User not found." });
  }
  //check for duplicate
  const duplicate = await User.findOne({ email }).lean().exec();
  //allow update to the original user
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

// delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).lean().exec();

  if (!user) {
    res.status(400).json({ message: "User not found." });
  }

  const result = await User.deleteOne();

  const reply = `${result.fullName} with email ${result.email} deleted successfully.`;
  res.json(reply);
});
