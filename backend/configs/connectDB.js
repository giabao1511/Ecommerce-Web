const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, () => {
      console.log("MongoDB connection SUCCESS");
    });
    
  } catch (error) {
    console.log(error);
    console.error("MongoDB connection FAIL");
    process.exit(1);
  }
};

module.exports = connectDB;
