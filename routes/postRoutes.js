import express from "express";
import {
  addPost,
  getAllPost,
  getUserPost,
  getPost,
  likePost,
  addComment
} from "../controllers/postController.js";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("file");
router.post("/like/:postId", likePost);
router.post("/comment/:postId", addComment);
router.post("/addpost", multerUploads, addPost);
router.get("/getpost/:postId", getPost);
router.get("/getallpost", getAllPost);
router.get("/getuserpost/:id", getUserPost);

export default router;
