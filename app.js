import express from "express";
import userRouter from "./routes/users.js";
import {config} from "dotenv";

export const app = express();
config({
    path: "./data/config.env"
});

//Using Middlewares
app.use(express.json());

//Using routes
app.use("/api/v1/users", userRouter);

app.get("/", async(req,res)=>{
    res.send("hey man you got this stay strong and i know you will land a great job, this is the start ")
});

