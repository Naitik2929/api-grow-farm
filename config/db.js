import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://vikram:1234@cluster0.ial2sfq.mongodb.net/GrowFarm"
    );

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};
export default connectDB;
