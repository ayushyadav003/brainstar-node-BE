import express from "express";
import authRouter from "./authRoutes.js";
import batchRouter from "./batchRoutes.js";
import meetingRouter from "./meetingRoutes.js";
import studentRouter from "./studentsRoutes.js";
import userRoutes from "./userRoutes.js";
import classRouter from "./classRoutes.js";
import notesRouter from "./notesRoutes.js";
import ticketRouter from "./ticketRoutes.js";
import websiteRouter from "./webSiteRoutes.js";
import teacherRouter from "./teacherRoutes.js";

const router = express.Router();
const path = "/api/v1";

// Define routes for different endpoints
router.use(`${path}/auth`, authRouter);
router.use(`${path}/users`, userRoutes);
router.use(`${path}/class`, classRouter);
router.use(`${path}/batch`, batchRouter);
router.use(`${path}/students`, studentRouter);
router.use(`${path}/meetings`, meetingRouter);
router.use(`${path}/notes`, notesRouter);
router.use(`${path}/tickets`, ticketRouter);
router.use(`${path}/website`,websiteRouter)
router.use(`${path}/teacher`,teacherRouter)

// Export the router
export default router;
