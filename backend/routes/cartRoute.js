import express from "express";
import {
    addToCart,
    getCart,
    removeFromCart,
} from "../controllers/cartControllers.js";
import authMiddleWare from "../middlewares/auth.js";
const cartRouter = express.Router();

cartRouter.post("/add", authMiddleWare, addToCart);

cartRouter.get("/get", authMiddleWare, getCart);

cartRouter.delete("/remove", authMiddleWare, removeFromCart);

export default cartRouter;