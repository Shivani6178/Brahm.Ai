import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/Posts.js";
import GenerateImageRouter from "./routes/GenerateImage.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Error handler middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({ success: false, status, message });
});

// Define routes
app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

// Default route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello GFG Developers!" });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

// Start the server
const startServer = async () => {
  await connectDB();
  app.listen(8080, () => console.log("Server running on port 8080"));
};

startServer();
