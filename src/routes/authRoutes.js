import express from "express";
import { loginLimitter } from "../middlewares/logiinLimiter.js";
import { login, logout, refresh } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.route("/").post(loginLimitter, login);

authRouter.route("/refresh").get(refresh);

authRouter.route("/logout").post(logout);

export default authRouter;
