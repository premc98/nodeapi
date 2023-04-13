import express from "express";
import { 
    getAllUsers, 
    createNewUser, 
    getUserbyId,
    logIn,
    getMyprofile,
    logOut 
} from "../controllers/users.js";
import {isAuthenticated}  from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", createNewUser);

router.get("/logout", isAuthenticated, logOut);

router.post("/login", logIn);

router.get("/me", isAuthenticated, getMyprofile);


//dynamic routing
//"/userid/:id/:key"

router
    .route("/userid/:id")
    .get(getUserbyId);

export default router;

