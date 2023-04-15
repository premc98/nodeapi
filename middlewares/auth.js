import {User}  from "../models/users.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req,res,next) => {
    const {token} = req.cookies;

    if(!token)
        return next(new Error(`Error: Login First`));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);
    if(!req.user)
        return next(new Error(`Error: User not found`));
    next();
};