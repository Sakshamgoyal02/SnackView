const app = require("../backend/server"); 
const connectDB = require("../backend/src/db"); 

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  return app(req, res);
};