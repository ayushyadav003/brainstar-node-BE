import express from "express";
import {
  createNewUser,
  deleteUser,
  updateUser,
} from "../controllers/usersController.js";

const userRoutes = express.Router();

userRoutes.route("/").post(createNewUser).patch(updateUser).delete(deleteUser);

export default userRoutes;
