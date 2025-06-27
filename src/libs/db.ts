import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("please define mongo_uri in .env file");
}

let cached = global.mongoose;
