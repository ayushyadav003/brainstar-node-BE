import express from "express";
import {
  createClass,
  getAllClasses,
  updateClass,
} from "../controllers/classController.js";

const classRouter = express.Router();

classRouter
  .route("/")
  .get(getAllClasses)
  .post(createClass)
  .put(updateClass)
  .delete();

export default classRouter;
