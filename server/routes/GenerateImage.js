import express from "express";
import { generateImage } from "../controllers/GenerateAIImage.js";

const router = express.Router();

// POST /api/generateImage - Endpoint to generate and save image
router.post("/", generateImage);

export default router;
