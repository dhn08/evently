import { error } from "console";
import mongoose from "mongoose";
let cached = (global as any).mongoose || { conn: null, promise: null };

const MONGODB_URI = process.env.MONGODB_URI;
export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!MONGODB_URI) throw new Error("MONGODB URI is missing");
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });
  cached.con = await cached.promise;
  return cached.con;
};

//mongodb pass : 18PYGwwPCECyB192
