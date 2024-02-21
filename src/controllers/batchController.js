import asyncHandler from "express-async-handler";
import { Batch } from "../models/batch.js";

// get all batches
export const getAllBatches = asyncHandler(async (req, res) => {
  const { classId, institute } = req.query;

  if (!classId || !institute) {
    res.status(400).json({
      statusCode: 400,
      message: `${
        !classId ? "ClassId" : !institute && "InstituteId"
      } is required`,
    });
  }
  const batches = await Batch.find({ institute, class: classId });

  // const batches = await Batch.aggregate([
  //   {
  //     $match: { institute: institute, class: classId },
  //   },
  //   {
  //     $lookup: {
  //       from: "student",
  //       localField: "_id",
  //       foreignField: "batch",
  //       as: "students",
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: 1,
  //       title: 1,
  //       totalStudents: { $size: "$students" }, // Count the number of students
  //     },
  //   },
  // ]);

  if (!batches) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "No batches found!" });
  }

  res.status(200).json({ statusCode: 200, batches });
});

//create batch
export const createBatch = asyncHandler(async (req, res) => {
  const { title, classId, institute, fees } = req.body;

  if (!classId || !institute || !title) {
    res.status(400).json({
      statusCode: 400,
      message: `${
        !classId ? "ClassId" : !institute ? "InstituteId" : !title && "Title"
      } is required`,
    });
  }

  const batchObject = { title, class: classId, institute };
  const batch = await Batch.create(batchObject);

  if (!batch) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "Somthing went wrong!" });
  }

  return res
    .status(201)
    .json({ statusCode: 201, message: "Batch created successfully", batch });
});
