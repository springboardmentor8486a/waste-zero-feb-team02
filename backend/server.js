import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import mongoose from "mongoose";
import connectDB from "./dbconfig/config.js";

const app = express();
dotenv.config();

app.use(cors());

const PORT = 3000;


connectDB();



app.use(express.json())
app.get("/", (req, res) => {
  res.send("Hello World from Express server!");
});

app.use("/api/v1", userRoutes);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
