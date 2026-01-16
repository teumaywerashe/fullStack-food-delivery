import express from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/userControler.js";
// import userModel from '../models/UserModel'
const userRouter = express.Router();
// import { registerUser, loginUser } from "../controllers/userControler.js";

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get('/', getAllUsers)
export default userRouter;