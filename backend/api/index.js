const app = require("../src/app");
const connectDB = require("../src/db/db");

let isConnected = false;

module.exports = async (req, res) => {
  try {

     console.log("ENV MONGODB_URI:", process.env.MONGODB_URI);

    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }

    return app(req, res);
  } catch (err) {
    console.error("Serverless error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};