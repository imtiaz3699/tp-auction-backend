import express from "express";
import { addUser,deleteUser,getUser,updateUser,getAllUsers } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/add-user",addUser);
router.put("/update-user/:id",updateUser);
router.get("/get-sing-user",getUser);
router.delete("/delete-user/:id",deleteUser);
router.get("/get-all-user",getAllUsers);
export default router;