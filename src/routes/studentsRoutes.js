import express from "express";
import {
  craeteNewStudent,
  deleteStudent,
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
  .delete(deleteStudent);

studentRouter.route("/attendance").post(updateAttendance);
export default studentRouter;
