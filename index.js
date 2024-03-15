import db from "./config/db.js";
import express from "express";
const port = process.env.PORT || 8080;
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
import { getPrices } from "./controllers/priceController.js";
const app = express();

dotenv.config();
db();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Welcome to the backend of the project");
});
app.use("/api/users", userRoutes);
app.get("/api/prices/:pincode", getPrices);
app.use("/api/post", postRoutes);
app.listen(port, () => console.log(`Server is running on ${port}...`));
