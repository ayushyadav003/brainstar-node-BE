import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnect from "./utils/db/index.js";
import userRoutes from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import classRouter from "./routes/classRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Welcome to API!");
});
app.use("/auth", authRouter);
app.use("/user", userRoutes);
app.use("/class", classRouter);

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
  });
});
