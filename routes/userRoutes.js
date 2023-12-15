import express from "express";
import { registerUser, authUser } from "../controllers/userController.js";
import { sendOTP, verifyOTP } from "../controllers/otpController.js";
const router = express.Router();

router.post("/", registerUser);
// test
router.post("/auth", authUser);
router.get("/twilio-sms/send-otp", sendOTP);
router.get("/twilio-sms/verify-otp", verifyOTP);
export default router;
