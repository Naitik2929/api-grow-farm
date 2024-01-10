import Twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();
const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const otpRes = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: `+91${phoneNumber}`, channel: "sms" });
    res
      .status(200)
      .json({
        message: `OTP sent successfully`,
      })
      .send(`OTP sent successfully: ${JSON.stringify(otpRes)}`);
  } catch (error) {
    res.status(500).send(error + " Something went wrong");
  }
};
const verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;
  console.log(phoneNumber + otp);

  try {
    const verifyRes = await client.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: `+91${phoneNumber}`, code: otp });

    if (verifyRes.status === "approved") {
      res
        .status(200)
        .json({
          message: `OTP verified successfully`,
        })
        .send(`OTP verified successfully: ${JSON.stringify(verifyRes)}`);
    } else {
      res
        .status(400)
        .json({
          message: "Something went wrong",
        })
        .send("OTP verification failed");
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Something went wrong",
      })
      .json({ error: "An error occurred during OTP verification" });
  }
};

export { sendOTP, verifyOTP };
