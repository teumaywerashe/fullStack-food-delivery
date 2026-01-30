import { foodModel } from "../models/foodModel.js";
import fs from "fs";
import path from "path";
import { sendJson } from "../utils/sendJson.js";
import formidable from "formidable";


export const addFood = async(req, res) => {
    try {
        const form = formidable({
            multiples: false,
            uploadDir: "uploads",
            keepExtensions: true,
        });

        form.parse(req, async(err, fields, files) => {
            if (err) {
                return sendJson(res, 500, { success: false, msg: "Form parse error" });
            }

            // 1. Extract values correctly from arrays
            const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
            const price = Array.isArray(fields.price) ? fields.price[0] : fields.price;
            const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
            const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
            const quantity = Array.isArray(fields.quantity) ? fields.quantity[0] : fields.quantity;

            const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

            // 2. Fixed the typo in console.log
            console.log("Adding product:", name, category);

            // 3. Strict validation
            if (!name || !price || !imageFile) {
                console.log("Validation failed:", { name, price, imageFile: !!imageFile });
                return sendJson(res, 400, { success: false, msg: "Required fields missing" });
            }

            try {
                const newFood = new foodModel({
                    name,
                    ownerId: req.userId,
                    price: Number(price),
                    category,
                    description,
                    quantity: Number(quantity) || 0,
                    image: path.basename(imageFile.newFilename || imageFile.filepath),
                });

                await newFood.save();
                sendJson(res, 200, { success: true, msg: "Food added successfully", food: newFood });
            } catch (saveError) {
                console.error("DB Save Error:", saveError);
                sendJson(res, 500, { success: false, msg: "Error saving to database" });
            }
        });
    } catch (error) {
        console.error("Global Error:", error);
        sendJson(res, 500, { success: false, msg: "Server error" });
    }
};
export const listFood = async(_, res) => {
    const foods = await foodModel.find({});
    sendJson(res, 200, { success: true, foods });
};

// controllers/foodController.js

export const editFood = async(req, res) => {
    try {
        const form = formidable({
            multiples: false,
            uploadDir: "uploads",
            keepExtensions: true,
        });

        form.parse(req, async(err, fields, files) => {
            if (err) {
                return sendJson(res, 500, { success: false, msg: "Form parse error" });
            }

            // Extract ID (Required for finding the document)
            const id = Array.isArray(fields.id) ? fields.id[0] : fields.id;
            if (!id) {
                return sendJson(res, 400, { success: false, msg: "Food ID is required" });
            }

            try {
                const food = await foodModel.findById(id);
                if (!food) {
                    return sendJson(res, 404, { success: false, msg: "Food not found" });
                }

                // Create update object dynamically (Partial Update)
                const updateData = {};

                // Only update if the field is present and not an empty string
                const fieldsToUpdate = ["name", "category", "price", "description", "quantity"];
                fieldsToUpdate.forEach((key) => {
                    const value = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
                    if (value !== undefined && value !== "") {
                        // Cast specific types
                        if (key === "price" || key === "quantity") {
                            updateData[key] = Number(value);
                        } else {
                            updateData[key] = value;
                        }
                    }
                });

                // Handle Image Update
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
                if (imageFile && imageFile.originalFilename) {
                    // Delete old image file
                    const oldPath = path.join("uploads", food.image);
                    if (fs.existsSync(oldPath)) {
                        fs.unlink(oldPath, (err) => {
                            if (err) console.error("Old image delete error:", err);
                        });
                    }
                    // Set new image filename
                    updateData.image = path.basename(imageFile.newFilename || imageFile.filepath);
                } else if (imageFile) {
                    // If formidable created a temp file but no real image was uploaded, clean it up
                    fs.unlink(imageFile.filepath, () => {});
                }

                // Update only the provided fields using $set
                await foodModel.findByIdAndUpdate(id, { $set: updateData });

                sendJson(res, 200, {
                    success: true,
                    msg: "Food updated successfully",
                    updatedFields: Object.keys(updateData)
                });

            } catch (dbError) {
                console.error("Database error:", dbError);
                sendJson(res, 500, { success: false, msg: "Error updating database" });
            }
        });
    } catch (error) {
        console.error("Global Error:", error);
        sendJson(res, 500, { success: false, msg: "Server error" });
    }
};

export const removeFood = async(req, res) => {
    const parts = req.url.split('/');
    const id = parts[parts.length - 1];

    try {
        const food = await foodModel.findById(id);

        if (!food) {
            return sendJson(res, 404, { success: false, msg: "Food not found" });
        }

        // Only try to delete the file if the food exists
        const filePath = path.join("uploads", food.image);
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, () => {});
        }

        await foodModel.findByIdAndDelete(id);
        sendJson(res, 200, { success: true, msg: "Removed successfully" });

    } catch (error) {
        sendJson(res, 500, { success: false, msg: "Server error during deletion" });
    }
};