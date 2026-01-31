import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import { sendJson } from "../utils/sendJson.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export const getAllUsers = async(_req, res) => {
    try {
        const users = await userModel.find({ role: "user" }).select("-password");

        if (!users || users.length === 0) {
            return sendJson(res, 404, { success: false, msg: "No users found" });
        }

        sendJson(res, 200, { success: true, users });
    } catch (error) {
        console.log(error);
        sendJson(res, 500, { success: false, msg: "Server error" });
    }
};


export const registerUser = async(req, res) => {
    try {

        const { name, email, password } = req.body;

        // Check if user already exists
        const exist = await userModel.findOne({ email });
        if (exist) {
            return sendJson(res, 400, {
                success: false,
                msg: "User already exists, please login",
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return sendJson(res, 400, {
                success: false,
                msg: "Please provide a valid email",
            });
        }

        // Validate password length
        if (!password || password.length < 4) {
            return sendJson(res, 400, {
                success: false,
                msg: "Password is not strong enough",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        // Create JWT
        const token = createToken(user._id);

        sendJson(res, 201, { success: true, token, user });
    } catch (error) {
        console.error("Register error:", error);
        sendJson(res, 500, { success: false, msg: "Something went wrong" });
    }
};

export const loginUser = async(req, res) => {
    try {


        const { email, password } = req.body;

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return sendJson(res, 404, { success: false, msg: "No user with this email" });
        }

        // Compare password
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
            return sendJson(res, 400, { success: false, msg: "Incorrect password" });
        }

        // Create JWT
        const token = createToken(user._id);

        sendJson(res, 200, { success: true, token, user });
    } catch (error) {
        console.log(error);
        sendJson(res, 500, { success: false, msg: "Something went wrong" });
    }
};