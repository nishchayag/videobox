import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("please define mongo_uri in .env file");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    connection: null,
    promise: null,
  };
}

export async function connectDB() {
  if (cached.connection) {
    return cached.connection;
  }
  if (!cached.promise) {
    mongoose.connect(MONGO_URI).then(() => mongoose.connection);
  }
  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw new Error("Error connecting to db: " + error);
  }
  return cached.connection;
}
