import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
  `mongodb+srv://fwpass:${process.env.MONGO_PASSWORD}@cluster0-2in7w.gcp.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
);

const db = mongoose.connection;

const connectDB = () => {
  console.log("✨ database connected !!!");
};

const errorHandler = (error) => {
  console.log("🤦‍♀️🤦‍♀️", error);
};

db.once("open", connectDB);
db.on("error", errorHandler);
