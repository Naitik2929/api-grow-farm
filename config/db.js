import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected: ${conn.connection.name} - ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};
export default connectDB;
