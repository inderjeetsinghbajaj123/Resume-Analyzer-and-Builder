import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.set("trust proxy", 1);
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://resume-analyzer-and-builder-zeta.vercel.app"
    ],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

import router from "./routes/auth.route.js";
app.use("/api/auth", router);

import interviewRouter from "./routes/interview.routes.js";
app.use("/api/interview", interviewRouter);

export default app;