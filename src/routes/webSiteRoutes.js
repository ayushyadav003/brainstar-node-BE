import express from "express";
import {
  createWebsite,
  deleteWebsite,
  getWebsite,
  updateWebsite,
} from "../controllers/websiteController.js";

const websiteRouter = express.Router();

websiteRouter
  .route("/")
  .post(createWebsite)
  .get(getWebsite)
  .delete(deleteWebsite)
  .put(updateWebsite);
websiteRouter.route("/:instituteId").get(getWebsite);

export default websiteRouter;
