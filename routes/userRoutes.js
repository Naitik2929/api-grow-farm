import express from "express";
import {
  registerUser,
  authUser,
  getScheme,
} from "../controllers/userController.js";
import { sendOTP, verifyOTP } from "../controllers/otpController.js";
const router = express.Router();

router.post("/", registerUser);
router.get("/schemes", getScheme);
router.post("/auth", authUser);
router.get("/twilio-sms/send-otp", sendOTP);
router.get("/twilio-sms/verify-otp", verifyOTP);
export default router;
