import asyncHandler from "express-async-handler";
import { Batch } from "../models/batch.js";

// get all batches
export const getAllBatches = asyncHandler(async (req, res) => {
  const { classId, instituteId } = req.body;

  if (!classId || !instituteId) {
    res.status(400).json({
      message: `${
        !classId ? "ClassId" : !instituteId && "InstituteId"
      } is required`,
    });
  }
  const batches = await Batch.find({ institute: instituteId, class: classId });

  if (!batches) {
    return res.status(400).json({ message: "No batches found!" });
  }
  res.json(batches);
});

//create batch
export const createBatch = asyncHandler(async (req, res) => {
  const { title, classId, instituteId } = req.body;

  if (!classId || !instituteId || !title) {
    res.status(400).json({
      message: `${
        !classId ? "ClassId" : !instituteId ? "InstituteId" : !title && "Title"
      } is required`,
    });
  }

  const batchObject = { title, class: classId, institute: instituteId };
  const batch = await Batch.create(batchObject);

  if (!batch) {
    return res.status(400).json({ message: "Somthing went wrong!" });
  }

  return res.status(200).json({ message: "Batch created successfully", batch });
});
