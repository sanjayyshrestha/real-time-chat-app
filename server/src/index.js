import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from 'cookie-parser'
import userRouter from "./routes/user.route.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors({
  origin:['http://localhost:5173','http://localhost:5174'],
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth',userRouter)
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
