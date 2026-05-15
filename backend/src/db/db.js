const mongoose = require("mongoose");

let isConnected = false; // cache connection

async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("MongoDB connected successfully");

  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

module.exports = connectDB;