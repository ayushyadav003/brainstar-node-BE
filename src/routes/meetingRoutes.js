import express from "express";
import { createMeeting } from "../controllers/meetingsController.js";

const meetingRouter = express.Router();

meetingRouter.route("/").get().post(createMeeting).put().delete();

export default meetingRouter;
