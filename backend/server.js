require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

const PORT = 3000;

async function startServer() {
  try {
    await connectDB(); 
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();

