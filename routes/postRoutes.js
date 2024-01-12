import express from "express";
import { addPost } from "../controllers/postController.js";
import multer from "multer";
const router = express.Router();
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('file');
router.post("/",multerUploads,addPost);

export default router;