import asyncHandler from "express-async-handler";
import User from "../models/User.js";
// import puppeteer from "puppeteer";
const registerUser = asyncHandler(async (req, res) => {
  const { name, phoneNumber, password, gmail } = req.body;
  const userExist = await User.findOne({ phoneNumber });
  if (userExist) {
    res.status(400);
    res.json({
      message: "User already exists",
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
      message: "Invalid Data",
    });
    throw new Error("Invalid user data");
  }
});

const setPassword = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const user = await User.findOne({ phoneNumber });
    if (user) {
      user.password = password;
      await user.save();
      res.status(200).json({
        message: "Password set successfully",
      });
    } else {
      res.status(400).json({
        message: "Invalid Data",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
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
      message: "Invalid password or phonenumber",
    });
    throw new Error("invalid password or phonenumber");
  }
});
const getScheme = async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = "https://vikaspedia.in/schemesall/schemes-for-farmers";

  await page.goto(url);

  const results = await page.evaluate(() => {
    const schemeElements = document.querySelectorAll(".folderfile_name");
    const descriptionElements = document.querySelectorAll("p");

    const schemes = [];

    schemeElements.forEach((schemeElement, index) => {
      const title = schemeElement.textContent.trim();
      const link = "https://vikaspedia.in" + schemeElement.getAttribute("href");
      const description = descriptionElements[index].textContent.trim();

      schemes.push({ title, description, link });
    });

    return schemes;
  });

  res.send({ schemes: results });

  await browser.close();
};

export { registerUser, authUser, getScheme, setPassword };
