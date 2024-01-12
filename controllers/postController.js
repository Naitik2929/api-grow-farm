import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { cloudinary } from "../config/cloudinary.js"
import path from 'path'
import DataURIParser from "datauri/parser.js";

const addPost = asyncHandler(async (req, res) => {
    try {
        const { postTitle, userId, description } = req.body;
        console.log(req.body)
        const user = await User.findOne({ _id: userId });
        console.log(req.file)
        const parser = new DataURIParser();
      const file = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);
        if (user) {
            const uploadedResponse = await cloudinary.uploader.upload(file.content, {
                upload_preset: 'growfarm',
            });
            console.log(uploadedResponse);
            const postMedia = [];
            postMedia.push(uploadedResponse.public_id);
            const post = await Post.create({
                postTitle: postTitle,
                user: userId,
                description: description,
                postMedia: postMedia,
            })
            console.log(post);
            res.status(200);
            res.json({
                postTitle: post.postTitle,
            })
        }
        else {
            res.status(400);
            res.json({
                message: "User does not Exist"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({
            message: "Something went wrong"
        });
    }
})

export { addPost };
