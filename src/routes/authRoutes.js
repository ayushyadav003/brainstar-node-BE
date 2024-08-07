import express from "express";
import {
  forgotPassword,
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
authRouter.route("/forgotPassword").post(forgotPassword);

export default authRouter;
