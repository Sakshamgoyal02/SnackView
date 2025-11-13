const mongoose = require("mongoose");


async function connectDB(){
    try{
      await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb connected successfully");
    }catch(err){
      console.log("mongodb connection error", err);
    }
} 

module.exports = connectDB;