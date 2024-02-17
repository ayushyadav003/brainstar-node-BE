import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import Jwt from "jsonwebtoken";

// POST /auth
// public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required.`" });
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Password mismatch" });

  const accessToken = Jwt.sign(
    {
      userInfo: {
        email: foundUser.email,
        role: foundUser.role,
      },
    },
    process.env.ACCESS.TOKEN_SECRET,
    { expireIn: "30d" }
  );
  const refreshToken = Jwt.sign(
    {
      userInfo: {
        email: foundUser.email,
      },
    },
    process.env.ACCESS.TOKEN_SECRET,
    { expireIn: "1d" }
  );

  const user = delete foundUser.password;

  return res.status(200).json({
    message: "Login successful",
    data: { user },
  });
});
