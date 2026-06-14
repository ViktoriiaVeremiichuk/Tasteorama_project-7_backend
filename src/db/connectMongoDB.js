import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    const mongoUrl = process.env.MONGO_URL;

    await mongoose.connect(mongoUrl);

    console.log("✅ MongoDB connection established successfully");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}