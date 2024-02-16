import express from "express";
import {
  registerUserF,
  registerUserS,
  authUser,
  getScheme,
  setPassword,
  followUser,
  getUserProfile,
} from "../controllers/userController.js";
import { sendOTP, verifyOTP } from "../controllers/otpController.js";
const router = express.Router();

router.post("/follow/:id", followUser);
router.get("/userprofile/:id", getUserProfile);
router.post("/regf", registerUserF);
router.post("/regs", registerUserS);
router.get("/schemes", getScheme);
router.post("/setPassword", setPassword);
router.post("/auth", authUser);
router.post("/twilio-sms/send-otp", sendOTP);
router.post("/twilio-sms/verify-otp", verifyOTP);
export default router;
