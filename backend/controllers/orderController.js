import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import axios from 'axios'
import userModel from "../models/UserModel.js";
const chapaSecretKey = process.env.CHAPA_SECRET_KEY;
// export const placeOrder = async(req, res) => {
//     try {
//         const newOrder = new orderModel({
//             userId: req.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address,
//         });
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

//         const line_items = req.body.items.map((item) => ({
//             price_data: {
//                 currency: "USD",
//                 product_data: {
//                     name: item.name,
//                 },
//                 unit_amount: Number(item.price) * 100,
//             },
//             quantity: item.quantity,
//         }));

//         line_items.push({
//             price_data: {
//                 currency: "USD",
//                 product_data: {
//                     name: "delivery charges",
//                 },
//                 unit_amount: 2 * 100,
//             },
//             quantity: 1,
//         });
//         const frontend_url = "http://localhost:5173";
//         const session = await stripe.checkout.sessions.create({
//             line_items: line_items,
//             mode: "payment",
//             success_url: `${frontend_url}/verify?success=true&ordersId=${newOrder._id}`,
//             cancel_url: `${frontend_url}/verify?success=false&ordersId=${newOrder._id}`,
//         });
//         res.json({ success: true, session_url: session.url });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, msg: "error" });
//     }
// };


export const placeOrder = async(req, res) => {
    try {


        // 1️⃣ Save the order first
        const newOrder = new orderModel({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: false,
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

        // 2️⃣ Prepare Chapa transaction
        const frontend_url = "http://localhost:5173";
        const tx_ref = `order-${newOrder._id}`; // unique transaction reference

        const response = await axios.post(
            "https://api.chapa.co/v1/transaction/initialize", {
                amount: req.body.amount, // total amount
                currency: "ETB", // Chapa supports ETB
                email: req.body.email,
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                tx_ref,
                callback_url: `${frontend_url}/verify?ordersId=${newOrder._id}`,
            }, {
                headers: {
                    Authorization: `Bearer ${chapaSecretKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // 3️⃣ Send the Chapa checkout URL to frontend
        res.json({ success: true, checkout_url: response.data.data.checkout_url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "Payment initialization failed" });
    }
};
// export const verifyOrder = async(req, res) => {
//     try {
//         const { orderId, success } = req.body;
//         if (success === "true") {
//             await orderModel.findByIdAndUpdate(orderId, { payment: "true" });
//             res.json({ success: true, msg: "paid" });
//         } else {
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({ success: false, msg: "not paid" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, msg: "Error" });
//     }
// };


export const verifyOrder = async(req, res) => {
        try {
            const { ordersId } = req.query;

            const order = await orderModel.findById(ordersId);
            if (!order) return res.status(404).json({ success: false, msg: "Order not found" });

            // Verify with Chapa API
            const response = await axios.get(
                    `https://api.chapa.co/v1/transaction/verify/${`order-${order._id}`}`,
      {
        headers: {
          Authorization: `Bearer ${chapaSecretKey}`,
        },
      }
    );

    if (response.data.data.status === "success") {
      order.payment = "true";
      await order.save();
      res.json({ success: true, msg: "Payment successful" });
    } else {
      order.payment = "failed";
      await order.save();
      res.json({ success: false, msg: "Payment not successful" });
    }
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.json({ success: false, msg: "Error verifying payment" });
  }
};

export const listOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "Error" });
    }
};

export const updateStatus = async(req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {
            status: req.body.status,
        });
        res.json({ success: true, msg: "Status Updated " });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "Error" });
    }
};

export const userOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "error" });
    }
};