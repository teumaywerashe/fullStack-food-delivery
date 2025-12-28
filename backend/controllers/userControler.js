import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export const registerUser = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        const exist = await userModel.findOne({ email });

        if (exist) {
            return res.json({
                success: false,
                msg: "User already exists, please login",
            });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, msg: "Please provide a valid email" });
        }

        if (password.length < 4) {
            return res.json({ success: false, msg: "Password is not strong enough" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, token, user });
    } catch (error) {
        console.error("Register error:", error);
        res.json({ success: false, msg: "Something went wrong" });
    }
};

export const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.json({ success: false, msg: "No User With This Email" });
        }
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
            return res.json({
                success: false,
                msg: "incorrect password",
            });
        }
        const token = createToken(user._id);
        res.json({ success: true, token: token, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "something wrong happened" });
    }
};