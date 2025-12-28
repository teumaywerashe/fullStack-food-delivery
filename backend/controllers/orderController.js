import orderModel from "../models/orderModel.js";
import axios from "axios";
import userModel from "../models/userModel.js";
const chapaSecretKey = process.env.CHAPA_SECRET_KEY;

export const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const frontend_url = "https://fullstack-food-delivery-1.onrender.com";
    const tx_ref = `order-${newOrder._id}`;

    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        amount: req.body.amount,
        currency: "ETB",
        email: req.body.email,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        tx_ref,
        callback_url: `${frontend_url}/verify?ordersId=${newOrder._id}`,
      },
      {
        headers: {
          Authorization: `Bearer ${chapaSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ success: true, checkout_url: response.data.data.checkout_url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Payment initialization failed" });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const { ordersId } = req.query;

    const order = await orderModel.findById(ordersId);
    if (!order)
      return res.status(404).json({ success: false, msg: "Order not found" });

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

export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Error" });
  }
};

export const updateStatus = async (req, res) => {
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

export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "error" });
  }
};
