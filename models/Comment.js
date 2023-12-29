import mongoose from "mongoose";
import User from "./User.js";
const commentSchema = mongoose.Schema(
  {
    commentDescription: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
    
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
