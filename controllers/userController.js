import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, phoneNumber, password, gmail } = req.body;
  const userExist = await User.findOne({ phoneNumber });
  // console.log(userExist);
  if (userExist) {
    res.status(400);
    throw new Error("User alreasy exists");
  }
  // if (!email) email = "";
  const user = await User.create({ name, phoneNumber, password, gmail });
  if (user) {
    res.status(200).json({
      _id: user._id,
      phoneNumber: user.phoneNumber,
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { registerUser };
