import userModel from "../models/UserModel.js";

const addToCart = async(req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.userId });

        if (!userData) {
            return res.json({ success: false, msg: "User not found" });
        }

        const cartData = await userData.cart;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cart: cartData });

        res.json({ success: true, msg: "Added to cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

const removeFromCart = async(req, res) => {
    try {
        const userData = await userModel.findById(req.userId);
        let cartData = userData.cart || {};
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        for (let key in cartData) {
            if (cartData[key] === 0) {
                delete cartData[key];
            }
        }
        await userModel.findByIdAndUpdate(req.userId, { cart: cartData });

        res.json({ success: true, msg: "removed from the cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "error" });
    }
};
const getCart = async(req, res) => {
    try {
        const userData = await userModel.findById(req.userId);
        const cartData = userData.cart;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "error" });
    }
};

export { addToCart, removeFromCart, getCart };