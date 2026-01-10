import express from "express";
import authMiddleWare from "../middlewares/auth.js";
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/place", authMiddleWare, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/userOrder", authMiddleWare, userOrders);
orderRouter.post("/status", authMiddleWare, updateStatus);
orderRouter.get("/list", authMiddleWare, listOrders);
// orderRouter.get('/delete', deleteOrders)
export default orderRouter;