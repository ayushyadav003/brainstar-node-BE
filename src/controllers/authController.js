import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import Jwt from "jsonwebtoken";
import { Student } from "../models/student.js";
import { Teacher } from "../models/teacher.js";

// POST /auth
// public
export const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res
      .status(200)
      .json({ statusCode: 400, message: "All fields are required.`" });
  }

  var foundUser;

  switch (role) {
    case "Student":
      foundUser = await Student.findOne({ email }).exec();
      break;
    default:
      foundUser = await User.findOne({ email }).exec();
      if (!foundUser) {
        foundUser = await Teacher.findOne({ email }).exec();
      }
      break;
  }

  if (!foundUser) {
    return res
      .status(200)
      .json({ statusCode: 404, message: "No user found with this email" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match)
    return res
      .status(200)
      .json({ statusCode: 401, message: "Wrong password." });

  // const accessToken = Jwt.sign(
  //   {
  //     userInfo: {
  //       email: foundUser.email,
  //       role: foundUser.role,
  //     },
  //   },
  //   process.env.ACCESS.TOKEN_SECRET,
  //   { expireIn: "30d" }
  // );
  // const refreshToken = Jwt.sign(
  //   {
  //     userInfo: {
  //       email: foundUser.email,
  //     },
  //   },
  //   process.env.ACCESS.TOKEN_SECRET,
  //   { expireIn: "1d" }
  // );

  delete foundUser.password;
  return res.status(200).json({
    statusCode: 200,
    message: "Login successful",
    data: { foundUser },
  });
});
