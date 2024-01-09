import express from "express";
import { addPost } from "../controllers/postController.js";

const router = express.Router();

router.post("/",addPost);

export default router;