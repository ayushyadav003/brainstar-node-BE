import express from "express";

const studentRouter = express.Router();

studentRouter.route("/").get().post().put().delete();
