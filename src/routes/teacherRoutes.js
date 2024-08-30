import express from "express";
import {
  createNewTeacher,
  deleteTeacher,
  getAllTeachers,
  updateTeacher,
} from "../controllers/teacherController.js";

const teacherRouter = express.Router();

teacherRouter
  .route("/")
  .get(getAllTeachers)
  .post(createNewTeacher)
  .put(updateTeacher)
  .delete(deleteTeacher);

export default teacherRouter;
