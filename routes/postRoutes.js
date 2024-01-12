import express from "express";
import {
  addPost,
  getAllPost,
  getUserPost,
  getPost,
  likePost,
  addComment,
} from "../controllers/postController.js";
const router = express.Router();

router.post("/like/:postId", likePost);
router.post("/comment/:postId", addComment);
router.post("/addpost", addPost);
router.get("/getpost/:postId", getPost);
router.get("/getallpost", getAllPost);
router.get("/getuserpost/:id", getUserPost);

export default router;
