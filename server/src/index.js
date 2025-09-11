import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from 'cookie-parser'
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successfull")
      console.log(`Server is listening at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed : ", err.message);
    process.exit(1)
  });
