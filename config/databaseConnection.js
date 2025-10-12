import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function databaseConnection() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("mongo connected successfully");
  } catch (error) {
    console.log("error connecting to mongodb" , error);
  }
}
