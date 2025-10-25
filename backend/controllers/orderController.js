import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name,
        },
        unit_amount: Number(item.price) * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "USD",
        product_data: {
          name: "delivery charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });
    const frontend_url = "http://localhost:5173";
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&ordersId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&ordersId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "error" });
  }
};
export const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: "true" });
      res.json({ success: true, msg: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, msg: "not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Error" });
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
