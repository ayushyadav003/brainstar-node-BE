import express from "express";
import {
  createNewUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/usersController.js";

const userRoutes = express.Router();

userRoutes
  .route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

export default userRoutes;
