import express from "express";
import mongoose from "mongoose";


const app = express();

const schema = new mongoose.Schema({
    name: String,
    email: String,
    paswword: String,
});

const User = mongoose.model("User", schema);

mongoose
    .connect("mongodb://127.0.0.1:27017/", {
        dbName: "backendapi",
    })
    .then(() => console.log("DB connected"))
    .catch((e)=> console.log(e));

app.get("/", async(req,res)=>{
    res.send("hey man you got this stay strong and i know you will land a great job, this is the start ")
});

app.get("/users/all", async (req,res)=>{

    const users = await User.find({}).then

    res.json({
        success: true,
        users,

    });

});

app.post("/users/new", async (req,res)=>{

    //const {name, email, password} = req.body
    await User.create({
        name: "Prem",
        email: "s.premchander98@gmail.com",
        password: "password",

    });

    res.json({
        success: true,
        message: "Registered Successfully",

    });

});



app.listen(4000,()=>{
    console.log("server is working");
});

