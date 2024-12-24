// const mongoose = require("mongoose");
import mongoose from "mongoose";
const mongoUri = "mongodb://localhost:27017/mcqquestions";

async function connectToMongo() {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error.message);
  }
}

export default connectToMongo;