import jwt from "jsonwebtoken";


export const sendCookie = (user,res,message,statusCode=200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    
    res
        .status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000, //15 mins 1000ms = 1sec, 60 * 1 sec = i min, 15 * 1min = 15mins  
        })
        .json({
            success: true,
            message,
        });

};
