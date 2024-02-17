import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

// Create new user
export const createNewUser = asyncHandler(async (req, res) => {
  const { fullName, instituteName, password, email, phone, role } = req.body;

  //confirm data
  if (!fullName || !instituteName || !password || !email || !role) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  //check for duplicate
  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "User with this email already exist." });
  }

  const hashedPassword = await bcrypt.hash(password, 10); //salt rounds
  const userObject = {
    fullName,
    password: hashedPassword,
    institute: instituteName,
    email,
    phone,
    role,
  };

  //create and store new user
  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: "User created successfully.", data: user });
  } else {
    res.status(400).json({ message: "Invalid user data receives." });
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
