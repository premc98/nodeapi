import jwt from "jsonwebtoken";


export const sendCookie = (user,res,message,statusCode=200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    
    res
        .status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            //15 mins 1000ms = 1sec, 60 * 1 sec = i min, 15 * 1min = 15mins 
            maxAge: 15 * 60 * 1000, 
            //This must be set to "None" along with "secure" attribute for CORS if frontend and backend are running on separate urls, if its the same URL then set it to "Strict"
            sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None", 
            secure: process.env.NODE_ENV === "development" ? false : true,

            //enable these options instead of the above to test on Postman.
            // sameSite: "Lax",
            // secure: false,
        })
        .json({
            success: true,
            message,
        });

};
