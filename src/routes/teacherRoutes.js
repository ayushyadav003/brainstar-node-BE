import express from "express";
import { createNewTeacher } from "../controllers/teacherController.js";

const teacherRouter = express.Router();

teacherRouter.route("/createTeacher").post(createNewTeacher)


export default teacherRouter;
