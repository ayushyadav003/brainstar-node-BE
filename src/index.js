import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnect from "./utils/db/index.js";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Welcome to API!");
});

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
