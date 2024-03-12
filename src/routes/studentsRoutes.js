import express from "express";
import {
  craeteNewStudent,
  getAllStudents,
  getStudent,
  updateAttendance,
} from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter
  .route("/")
  .get(getAllStudents)
  .post(craeteNewStudent)
  .put()
  .delete();

studentRouter.route("/attendance").post(updateAttendance);
export default studentRouter;
