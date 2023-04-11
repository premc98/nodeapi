import User from "../models/users.js";









export const getUserbyId = async (req,res) => {

    const{id} = req.params
    const users = await User.fin


};