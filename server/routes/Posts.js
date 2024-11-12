import express from "express";
import { createPost, getAllPosts } from "../controllers/Posts.js";

const router = express.Router();

// GET /api/post - Retrieve all posts
router.get("/", getAllPosts);

// POST /api/post - Add a new post
router.post("/", createPost);

export default router;
