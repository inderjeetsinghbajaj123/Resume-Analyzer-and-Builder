import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  "https://resume-analyzer-and-builder-zeta.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true
}));

app.use(cookieParser())
app.use(express.json())

import router from "./routes/auth.route.js"
app.use("/api/auth",router)

import interviewRouter from "./routes/interview.routes.js"
app.use("/api/interview" , interviewRouter)


export default app