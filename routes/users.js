import express from "express";
import { 
    getAllUsers, 
    createNewUser, 
    getUserbyId,
    logIn 
} from "../controllers/users.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", createNewUser);

router.post("/login", logIn);


//dynamic routing
//"/userid/:id/:key"

router
    .route("/userid/:id")
    .get(getUserbyId);

export default router;

