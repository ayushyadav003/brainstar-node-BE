import express from "express";
import { loginLimitter } from "../middlewares/logiinLimiter.js";
import {
  login,
  sendOtp,
  superAdminLogin,
  superAdminSignup,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.route("/").post(login);
authRouter.route("/signup").post(superAdminSignup);
authRouter.route("/login").post(superAdminLogin);
authRouter.route("/sendOtp").post(sendOtp);

export default authRouter;
