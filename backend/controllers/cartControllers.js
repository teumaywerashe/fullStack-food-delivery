import userModel from "../models/userModel.js";


const addToCart = async(req, res) => {
    try {

        const userId = req.userId;

        const userData = await userModel.findOne({ _id: userId });

        if (!userData) {
            res.writeHead(404, { "Content-Type": "application/json" });
            return res.end(
                JSON.stringify({
                    success: false,
                    msg: "User not found",
                }),
            );
        }

        const cartData = userData.cart || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cart: cartData });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                success: true,
                msg: "Added to cart",
            }),
        );
    } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                success: false,
                msg: "Server error",
            }),
        );
    }
};


const removeFromCart = async(req, res) => {
    try {

        const userId = req.userId;

        const userData = await userModel.findById(userId);
        let cartData = userData.cart || {};

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        // Remove items with 0 quantity
        for (let key in cartData) {
            if (cartData[key] === 0) {
                delete cartData[key];
            }
        }

        await userModel.findByIdAndUpdate(userId, { cart: cartData });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                success: true,
                msg: "Removed from the cart",
            }),
        );
    } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                success: false,
                msg: "Error",
            }),
        );
    }
};


const getCart = async(req, res) => {
    try {
        const userId = req.userId;

        const userData = await userModel.findById(userId);
        const cartData = userData.cart || {};

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                success: true,
                cartData,
            }),
        );
    } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                success: false,
                msg: "Error",
            }),
        );
    }
};

export { addToCart, removeFromCart, getCart };