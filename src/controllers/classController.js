import asyncHandler from "express-async-handler";
import { Classes } from "../models/class.js";

// get all classes
export const getAllClasses = asyncHandler(async (req, res) => {
  const { institute, title } = req.query;
  if (!institute) {
    return res
      .status(200)
      .json({ statusCode: 400, message: "Institute is required." });
  }

  const classes = await Classes.aggregate([
    {
      $match: { institute: institute },
    },
    {
      $lookup: {
        from: "student",
        localField: "_id",
        foreignField: "class",
        as: "students",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        totalStudents: { $size: "$students" }, // Count the number of students
      },
    },
  ]);

  // const classes = await Classes.find({ institute: institute })
  //   .select("-__V")
  //   .lean();

  if (!classes?.length) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "No classes found." });
  }
  res.status(200).json({ statusCode: 200, classes });
});

// create class
export const createClass = asyncHandler(async (req, res) => {
  const { institute, title } = req.body;

  if (!institute || !title) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "All fields are required." });
  }

  const classObject = { institute, title };

  const newClass = await Classes.create(classObject);

  if (newClass) {
    return res
      .status(201)
      .json({ statusCode: 201, message: "Class created successfully!" });
  } else {
    res.status(400).json({ message: "Invalid class data receives." });
  }
});
// update class
export const updateClass = asyncHandler(async (req, res) => {
  const { institute, title, id } = req.body;

  const updatedClass = await Classes.findOneAndUpdate(
    { _id: id },
    { institute, title }
  );

  if (updatedClass) {
    return res
      .status(200)
      .json({ message: "Class updated successfully!", data: updateClass });
  } else {
    res.status(400).json({ message: "Invalid class data receives." });
  }
});

//delete class
export const deleteClass = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const classData = await Classes.findOne({ _id: id }).lean().exec();

  if (!classData) {
    res.status(400).json({ message: "Class not found." });
  }

  const result = await classData.deleteOne();

  const reply = `${result.title} batch deleted successfully.`;
  res.json(reply);
});
