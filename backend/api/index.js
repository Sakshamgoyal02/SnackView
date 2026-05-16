const app = require("../src/app");
const connectDB = require("../src/db/db");

let isConnected = false;

module.exports = async (req, res) => {
  try {
  
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "https://snack-view-frontend.vercel.app");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      return res.status(200).end();
    }

    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }

    return app(req, res);

  } catch (err) {
    console.error("🔥 Serverless error:", err);
    res.status(500).json({ error: err.message });
  }
};