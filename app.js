import express from "express";
import userRouter from "./routes/users.js";
import tasksRouter from "./routes/tasks.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";

export const app = express();
config({
    path: "./data/config.env"
});

//Using Middlewares
app.use(express.json());
app.use(cookieParser());

//Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", tasksRouter);

app.get("/", (req,res)=>{
    res.send("hey man you got this stay strong and i know you will land a great job, this is the start ")
});

