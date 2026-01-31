import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { notificationModel } from "../models/notificationModel.js";
import axios from "axios";
import { sendJson } from "../utils/sendJson.js";

const chapaSecretKey = process.env.CHAPA_SECRET_KEY;
const frontend_url = "http://localhost:4000";

export const placeOrder = async(req, res) => {
    try {
        const { items, firstName, lastName, email, amount, address } = req.body;

        const newOrder = new orderModel({
            userId: req.userId,
            items,
            amount,
            address,
            payment: false,
        });
        await newOrder.save();


        await notificationModel.create({
            to: items[0].ownerId || "admin",
            content: `You have new order from ${firstName} ${lastName}`,
        });

        await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

        await notificationModel.create({
            to: req.userId,
            content: `hello ${firstName} we have recieved your  order successifully. We will let you know your order's status latter. Thankyou`,
        });
        // Chapa Initialization
        const tx_ref = `order-${newOrder._id}`;
        const response = await axios.post(
            "https://api.chapa.co/v1/transaction/initialize", {
                amount,
                currency: "ETB",
                email: email,
                first_name: firstName,
                last_name: lastName,
                tx_ref,
                callback_url: "https://your-webhook-url.com/api/order/webhook",

            }, {
                headers: { Authorization: `Bearer ${chapaSecretKey}` }
            }
        );

        sendJson(res, 200, { success: true, checkout_url: response.data.data.checkout_url });
    } catch (error) {
        console.error("Chapa Error:");
        sendJson(res, 500, { success: false, msg: "Payment failed" });
    }
};
export const verifyOrder = async(req, res) => {
    try {

        const fullUrl = new URL(req.url, `http://${req.headers.host}`);
        const ordersId = fullUrl.searchParams.get("ordersId");

        if (!ordersId) {
            return sendJson(res, 400, { success: false, msg: "Order ID missing from URL" });
        }

        // 1. Check if order exists
        const order = await orderModel.findById(ordersId);
        if (!order) {
            return sendJson(res, 404, { success: false, msg: "Order not found in database" });
        }


        const response = await axios.get(
            `https://api.chapa.co/v1/transaction/verify/order-${ordersId}`, { headers: { Authorization: `Bearer ${chapaSecretKey}` } }
        );

        if (response.data.data.status === "success") {
            order.payment = true;
            await order.save();

            res.writeHead(302, { Location: `${frontend_url}/myorders` });
            res.end();
        } else {
            res.writeHead(302, { Location: `${frontend_url}/cart` });
            res.end();
        }
    } catch (error) {
        console.error("Verification Error:", error.response.data || error.message);
        sendJson(res, 500, { success: false, msg: "Internal Server Error during verification" });
    }
};


export const updateStatus = async(req, res) => {
    try {
        const order = await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        await notificationModel.create({
            to: order.userId,
            content: `hello there ${order.address.firstName} your orders status is ${req.body.status} Thankyou`,
        });
        sendJson(res, 200, { success: true, msg: "Status Updated" });
    } catch (error) {
        sendJson(res, 500, { success: false, msg: "Update failed" });
    }
};

export const userOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId }).sort({ createdAt: -1 });
        sendJson(res, 200, { success: true, data: orders });
    } catch (error) {
        sendJson(res, 500, { success: false, msg: "Error" });
    }
};

export const listOrders = async(_req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ createdAt: -1 });
        sendJson(res, 200, { success: true, data: orders });
    } catch (error) {
        sendJson(res, 500, { success: false, msg: "Error" });
    }
};