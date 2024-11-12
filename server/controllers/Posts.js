import Post from "../models/Posts.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Hugging Face API configuration
const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

// Get all posts
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(
      createError(
        error.response?.status,
        error.response?.data?.error?.message || error.message
      )
    );
  }
};

// Create Post with Image Generation and Upload
export const createPost = async (req, res, next) => {
  try {
    const { name, prompt } = req.body;

    // Generate image using Hugging Face
    const response = await axios.post(
      HUGGING_FACE_API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    // Convert image to base64 and upload to Cloudinary
    const imageBuffer = Buffer.from(response.data, "binary");
    const base64Image = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
    const photoUrl = await cloudinary.uploader.upload(base64Image, {
      folder: "generated_images",
    });

    // Save post to the database
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl?.secure_url,
    });

    return res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(
      createError(
        error.response?.status,
        error.response?.data?.error?.message || error.message
      )
    );
  }
};

