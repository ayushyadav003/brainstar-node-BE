import express from "express";
import authRouter from "./authRoutes.js";
import batchRouter from "./batchRoutes.js";
import meetingRouter from "./meetingRoutes.js";
import studentRouter from "./studentsRoutes.js";
import userRoutes from "./userRoutes.js";
import classRouter from './classRoutes.js'

const router = express.Router();
const path = '/api/v1'

// Define routes for different endpoints
router.use(`${path}/auth`, authRouter);
router.use(`${path}/register`, userRoutes);
router.use(`${path}/class`, classRouter);
router.use(`${path}/batch`, batchRouter);
router.use(`${path}/students`, studentRouter);
router.use(`${path}/meetings`, meetingRouter);

// Export the router
export default router;