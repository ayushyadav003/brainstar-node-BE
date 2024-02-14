import express from "express";
import { createBatch, getAllBatches } from "../controllers/batchController.js";

const batchRouter = express.Router();

batchRouter
  .route("/")
  .get(getAllBatches)
  .post(createBatch)
  .put(getAllBatches)
  .delete(getAllBatches);

export default batchRouter;
