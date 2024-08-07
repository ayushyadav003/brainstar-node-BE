import express from "express";
import {
  createNewStudent,
  deleteStudent,
  getAllStudents,
  getStudent,
  updateAttendance,
} from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.route("/createStudent").post(createNewStudent);

studentRouter.route("/attendance").post(updateAttendance);
export default studentRouter;
