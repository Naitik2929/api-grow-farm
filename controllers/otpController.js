import Twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();
const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const sendOTP = async (req, res) => {
  // const { phoneNumber } = req.body;
  try {
    const otpRes = await client.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: `+919328728856`, channel: "sms" });
    // res.status(200).(`OTP sent successfully: ${JSON.stringify(otpRes)}`);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    res.send(error + " Something went wrong");
  }
};
const verifyOTP = async (req, res) => {
  // const { phoneNumber, otp } = req.body;
  // console.log(phoneNumber + otp);
  // const phoneNumber = 9328728856;
  // const otp = "123456";
  try {
    const verifyRes = await client.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: `+919328728856`, code: `512653` });

    if (verifyRes.status === "approved") {
      res
        .status(200)
        .send(`OTP verified successfully: ${JSON.stringify(verifyRes)}`);
      res.json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ error: "OTP verification failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred during OTP verification" });
  }
};

export { sendOTP, verifyOTP };
