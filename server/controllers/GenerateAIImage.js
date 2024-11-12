import * as dotenv from "dotenv";
import { createError } from "../error.js";
import axios from "axios";

dotenv.config();

// Hugging Face API configuration
const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

// Controller to generate Image using Hugging Face
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      HUGGING_FACE_API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", // Get image as binary data
      }
    );

    // Convert image to base64
    const imageBuffer = Buffer.from(response.data, "binary");
    const base64Image = `${imageBuffer.toString("base64")}`;

    return res.status(200).json({ photo: base64Image });
  } catch (error) {
    next(
      createError(
        error.response?.status,
        error.response?.data?.error?.message || error.message
      )
    );
  }
};
