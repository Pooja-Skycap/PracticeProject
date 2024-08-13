import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes";

const app = express();

app.use(cors());
dotenv.config();
app.use(bodyParser.json());

mongoose
  .connect(`${process.env.MONGO_URL}`, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/users", userRoutes);

export default app;
