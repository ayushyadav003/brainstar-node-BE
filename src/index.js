import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnect from "./utils/db/index.js";
import swaggerDocs from "./swagger.js";
import rootRoutes from './routes/root.js'

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.get("/api/v1/", (req, res) => {
  res.send("Hello Welcome to API!");
});
app.use(rootRoutes);

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
