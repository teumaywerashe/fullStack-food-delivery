import { foodModel } from "../models/foodModel.js";
import fs from "fs";
const addFood = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, msg: "No file uploaded" });
        }

        // console.log(req.userId);

        const food = new foodModel({
            ownerId: req.userId,
            quantity: req.body.quantity,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file.filename,
            category: req.body.category,
        });

        await food.save();
        res.status(201).json({ success: true, msg: "added succesifully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "error" });
    }
};

const listFood = async(req, res) => {
    try {
        const foods = await foodModel.find({});
        // console.log(foods);
        res.status(200).json({ success: true, foods: foods });
    } catch (error) {
        res.status(400).json({ success: false, msg: "error" });
    }
};

const removeFood = async(req, res) => {
    const foodId = req.params.id;
    try {
        const food = await foodModel.findById(foodId);
        fs.unlink(`uploads/${food.image}`, () => {});
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).json({ succes: true, msg: "removed succesifully" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ succes: false, msg: "something wrong happened" });
    }
};

export { addFood, listFood, removeFood };