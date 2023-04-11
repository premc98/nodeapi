import express from "express";
import {User} from "../models/user.js";
import { 
    getAllUsers, 
    createNewUser, 
    updateUserbyId, 
    deleteUserbyId,
    getUserbyId 
} from "../controllers/users.js";

const router = express.Router();

//router.use(express.json()); //for reading req.body



router.get("/all", getAllUsers);

router.post("/new", createNewUser);

//dynamic routing
//"/userid/:id/:key"

router
    .route("/userid/:id")
    .get(getUserbyId)
    .put(updateUserbyId)
    .delete(deleteUserbyId);

export default router;

