import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, phoneNumber, password, gmail } = req.body;
  const userExist = await User.findOne({ phoneNumber });
  // console.log(userExist);
  if (userExist) {
    res.status(400);
    res.json({
      message:"User already exists"
    });
    throw new Error("User already exists");
  }

  const user = await User.create({ name, phoneNumber, password, gmail });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    res.status(400);
    res.json({
      message:"Invalid Data"
    });
    throw new Error("Invalid user data");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;
  const user = await User.findOne({ phoneNumber });

  if (user && (await user.matchPassword(password))) {
    
    res.json({
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    res.status(401);
    res.json({
      message: "Invalid password or phonenumber"
    })
    throw new Error("invalid password or phonenumber");
  }
});

export { registerUser, authUser };
