import path from "path";
import db from "./config/db.js";
import express from "express";
const port = process.env.PORT || 8080;
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
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
app.use("/api/users", userRoutes);
app.use("/api/prices", getPrices);
app.listen(port, () => console.log(`Server is running on ${port}...`));
