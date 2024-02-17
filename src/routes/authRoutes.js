import express from "express";
import { loginLimitter } from "../middlewares/logiinLimiter.js";
import { login } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.route("/").post(loginLimitter, login);

export default authRouter;
