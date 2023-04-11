import {User} from "../models/users.js";

export const getAllUsers = async (req,res) => {
    const users = await User.find({});

    res.json({
        success: true,
        users,

    });

};

export const createNewUser = async (req,res) => {
    const {name,email,password} = req.body;

    await User.create({
        name,
        email,
        password
    });
    res.json({
        success: true,
        message: "Registered Successfully",

    });

};

export const getUserbyId = async (req,res) => {
    const {id} = req.params
    const users = await User.findById(id);
    res.json({
        success: true,
        users
    });



};

export const updateUserbyId = async (req,res) => {
    res.json({
        success: true,
        message: "User updated"
    })

};

export const deleteUserbyId = async (req,res) => {
    const {id} = req.params;
    const users = await User.findById(id);

    await users.deleteOne({_id: id});
    res.json({
        success: true,
        message: "User deleted"
    })
    
};