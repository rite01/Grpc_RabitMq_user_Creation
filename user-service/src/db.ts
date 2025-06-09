/**
 * MongoDB connection utility for the User Service.
 *
 * - Connects to MongoDB using Mongoose
 * - Ensures a single connection instance
 * - Logs connection status and errors
 */

import mongoose from "mongoose";

let conn: any = null;

const connectDB = async () => {
  if (conn) return;
  const uri = process.env.MONGODB_URI;
  if (!uri)
    throw new Error("MONGODB_URI is not defined in environment variables");

  try {
    conn = await mongoose.connect(uri, {
      bufferCommands: false,
    });
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
};
export default connectDB;
