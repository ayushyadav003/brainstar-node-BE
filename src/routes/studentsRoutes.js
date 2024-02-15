import express from "express";
import {
  craeteNewStudent,
  getAllStudents,
  getStudent,
} from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter
  .route("/")
  .get(getAllStudents)
  .post(craeteNewStudent)
  .put()
  .delete();

export default studentRouter;
