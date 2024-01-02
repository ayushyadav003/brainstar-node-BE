import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { Jwt } from "jsonwebtoken";

// POST /auth
// public
export const login = asyncHandler(async (req, res) => {});

// GET /refresh
// public
export const refresh = asyncHandler(async (req, res) => {});

// GET /logout
// public - just clear the cookie if exist
export const logout = asyncHandler(async (req, res) => {});
