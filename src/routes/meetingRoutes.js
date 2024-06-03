import express from "express";
import {
  createMeeting,
  getAllMeetings,
} from "../controllers/meetingsController.js";

const meetingRouter = express.Router();

meetingRouter.route("/").get(getAllMeetings).post(createMeeting).put().delete();

export default meetingRouter;
