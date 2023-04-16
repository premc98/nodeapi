import {User} from "../models/users.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req,res,next) => {
    const users = await User.find({})
    if(users.length == 0)
        return next(new ErrorHandler(`Error: No users in DB`,404));
    //console.log(users[0]);    
    res.status(200).json({
        status: true,
        users,
    });

};

export const createNewUser = async (req,res,next) => {
    const {name,email,password} = req.body;

    let user = await User.findOne({email});

    if(user) 
        return next(new ErrorHandler(`Error: ${email} already in use`, 404)); 
    const hashedPassword = await bcrypt.hash(password, 10);   
    
    user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    sendCookie(user,res,"User created successfully!",201);
};

export const getUserbyId = async (req,res,next) => {
    const {id} = req.params;

    const user = await User.findById(id);
    if(!user)
        return next(new ErrorHandler(`Error: User with id ${id} does not exist`, 404)); 

    res.status(200).json({
        name: user.name,
        email: user.email,
    });
};

export const logIn = async (req,res,next) => {
    try {
        
        const {email,password} = req.body;
        const user = await User.findOne({email}).select("+password"); 
        //here we are providing +password because we have defined select: false for password in the schema
        
        if(!user)
            return next(new ErrorHandler(`Error: User with email ${email} does not exist`, 404));
        const ismatch = await bcrypt.compare(password, user.password);
        
        if(!ismatch)
            return next(new ErrorHandler(`Error: Invalid Password`, 404));
        
        sendCookie(user,res,`Welcome Back ${user.name}`,200);
        
    } catch (error) {
        next(error);
        
    }
    
};

export const logOut = async (req,res) => {
    res
        .status(200)
        .cookie("token","",{
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None", 
            secure: process.env.NODE_ENV === "development" ? false : true,
        })
        .json({
            status: true,
            message: `Logged out! ${req.user.name}`,

        });

};

export const getMyprofile = (req,res) => {

    res.status(200).json({
        status: true,
        user: req.user,
    });

};

// export const updateUserbyId = async (req,res) => {
//     res.json({
//         success: true,
//         message: "User updated"
//     })

// };

// export const deleteUserbyId = async (req,res) => {
//     const {id} = req.params;
//     const users = await User.findById(id);

//     await users.deleteOne({_id: id});
//     res.json({
//         success: true,
//         message: "User deleted"
//     })
    
// };