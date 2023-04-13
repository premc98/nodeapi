import express from "express";
import { 
    newTask,
    getMyTasks
} from "../controllers/tasks.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/updatetask", (req,res) => {
    res.send("hitask");

});

router.post("/new", isAuthenticated, newTask);

router.get("/getmytasks", isAuthenticated, getMyTasks);


export default router;

