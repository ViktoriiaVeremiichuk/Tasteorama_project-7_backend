import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connection established successfully");
  } catch (error) {
    console.error(error);
  }
}