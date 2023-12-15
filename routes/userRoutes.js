import express from "express";
import { registerUser } from "../controllers/userController.js";
import { getPrices } from "../controllers/priceController.js";
import { sendOTP, verifyOTP } from "../controllers/otpController.js";
const router = express.Router();

router.post("/", registerUser);
router.get("/price", getPrices);
router.get("/twilio-sms/send-otp", sendOTP);
router.get("/twilio-sms/verify-otp", verifyOTP);
export default router;
