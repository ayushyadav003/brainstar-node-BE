import asyncHandler from "express-async-handler";
import { Notes } from "../models/notes.js";

export const addNote = asyncHandler(async (req, res) => {
  const { note, teacherId, instituteId, batchId, classId } = req.body;

  if (!note || !teacherId || !instituteId || !batchId || !classId) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  const newNote = await Notes.create({
    note,
    teacherId,
    instituteId,
    batchId,
    classId,
  });

  res.status(201).json({
    statusCode: 201,
    message: "New Note is created",
    data: newNote,
  });
});

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.find();

  res.status(201).json({
    statusCode: 201,
    message: "All notes",
    data: notes,
  });
});

export const updateNote = asyncHandler(async (req, res) => {
  const { notesUpdate, noteId } = req.body;

  const updatedNote = await Notes.findOneAndUpdate(
    {
      _id: noteId,
    },
    {
      note: notesUpdate,
    },
    { new: true }
  );
  await Notes.update;
  if (!updatedNote) {
    return res
      .status(404)
      .json({ message: `Note with this id is not present` });
  }

  res.status(201).json({
    statusCode: 201,
    message: "Note updated",
    data: updatedNote,
  });
});

export const deleteNote = asyncHandler(async (req, res) => {
  const { noteId } = req.body;

  const note = await Notes.findOneAndDelete({ _id: noteId });

  if (!note) {
    return res
      .status(404)
      .json({ message: `Note with this id is not present` });
  }

  res.status(201).json({
    statusCode: 201,
    message: "Note deleted",
    data: note,
  });
});

export const getSingleNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Notes.findOne({ _id: id });

  if (!note) {
    return res
      .status(404)
      .json({ message: `Note with this id is not present` });
  }

  res.status(201).json({
    statusCode: 201,
    message: "Note fetched",
    data: note,
  });
});
