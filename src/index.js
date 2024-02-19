import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnect from "./utils/db/index.js";
import userRoutes from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import classRouter from "./routes/classRoutes.js";
import batchRouter from "./routes/batchRoutes.js";
import studentRouter from "./routes/studentsRoutes.js";
import swaggerDocs from "./swagger.js";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.get("/api/v1/", (req, res) => {
  res.send("Hello Welcome to API!");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/register", userRoutes);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/batch", batchRouter);
app.use("/api/v1/students", studentRouter);

dbConnect
  .then(() => {
    console.log("---Database is connected---");
    app.emit("ready");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.on("ready", () => {
  app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
    ``;
  });
  swaggerDocs(app, PORT);
});
