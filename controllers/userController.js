import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const registerUser = asyncHandler(async (req, res) => {
    const { name, phoneNumber, password, email } = req.body;
    const userExist = await User.findOne({ phoneNumber });
    // console.log(userExist);
    if (userExist) {
        res.status(400);
        throw new Error("User alreasy exists");
    }

    const user = await User.create({ name, phoneNumber, password, email });
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
const authUser = asyncHandler(async (req, res) => {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    }
     else {
        res.status(401);
        throw new Error("invalid password or email");
    }
});



export { registerUser , authUser};
