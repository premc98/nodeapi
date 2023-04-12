import {User} from "../models/users.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req,res) => {

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