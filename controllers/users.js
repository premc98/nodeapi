import {User} from "../models/users.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req,res) => {
    const users = await User.find({})
    if(!users)
        return res.status(404).json({
            status: false,
            message: "No users in DB"
        });
    console.log(users[0]);    
    res.status(200).json({
        status: true,
        users,
    });

};

export const createNewUser = async (req,res) => {
    const {name,email,password} = req.body;

    let user = await User.findOne({email});

    if(user) 
        return res.status(404).json({
            status: false,
            message: "User already exists",
        });

    const hashedPassword = await bcrypt.hash(password, 10);   
    
    user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    sendCookie(user,res,"User created successfully!",201);
};

export const getUserbyId = async (req,res) => {
    const {id} = req.params;

    const user = await User.findById(id);
    if(!user)
        return res.status(404).json({
            status: false,
            message: "User not found",
        });
    res.status(200).json({
        name: user.name,
        email: user.email,
    });
};

export const logIn = async (req,res,next) => {
    const {email,password} = req.body;
    const user = await User.findOne({email}).select("+password"); 
    //here we are providing +password because we have defined select: false for password in the schema
    
    if(!user)
        return res.status(404).json({
            status: false,
            message: `${email} does not exists`,
        });
    const ismatch = await bcrypt.compare(password, user.password);
    
    if(!ismatch)
        return res.status(404).json({
            status: false,
            message: "Invalid Password",
        });
    
    sendCookie(user,res,`Welcome Home ${user.name}`,200);
};

export const logOut = async (req,res) => {
    res
        .status(200)
        .cookie("token","",{
            expires: new Date(Date.now())
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