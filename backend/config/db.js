const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //connect karyu .env file mathi
    const conn = await mongoose.connect(process.env.MONGO_URL);
    //just cyan underline and text aave te mate host print kryo
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
