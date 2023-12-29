import mongoose from "mongoose";
import User from "./User.js";
const postSchema = mongoose.Schema(
    {
        postTitle: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        postMedia: [{
            type: String
        }
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]

    },
    {
        timestamps: true,
    }
);
const Post = mongoose.model("Post", postSchema);
export default Comment;
