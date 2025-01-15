import express from "express";
import {
  createPost,
  deletePostById,
  findAllPost,
  findPostByid,
  updatePostById,
} from "../repositories/postRepositories.js";
import upload from "../services/multerOperation.js";

import { getAllPosts, updatePost } from "../controller/postController.js";
import validate from "../validator/zodValidator.js";
import { zodPostSchema } from "../validator/zodPostSchema.js";

const router = express.Router();

router.post("/", upload.single("file"), validate(zodPostSchema), createPost);
router.get("/", getAllPosts);
router.get("/:id", findPostByid);
router.delete("/:id", deletePostById);
router.put("/:id", upload.single("file"), updatePost);
export default router;
