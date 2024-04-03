import express from "express";
import {
  craeteNewStudent,
  deleteStudent,
  getAllStudents,
  getStudent,
  updateAttendance,
} from "../controllers/studentController.js";

const teacherRoutes = express.Router();

teacherRoutes
  .route("/")
  .get()
  .post()
  .put()
  .delete();

export default teacherRoutes;
