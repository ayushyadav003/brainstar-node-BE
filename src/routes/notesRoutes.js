import express from "express";
import {
  addNote,
  deleteNote,
  getNotes,
  getSingleNote,
  updateNote,
} from "../controllers/notesController.js";

const notesRouter = express.Router();

notesRouter
  .route("/")
  .post(addNote)
  .get(getNotes)
  .put(updateNote)
  .delete(deleteNote);

notesRouter.route("/:id").get(getSingleNote);

export default notesRouter;
