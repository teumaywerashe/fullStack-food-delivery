import express from "express";
import multer from "multer";
import {
    addFood,
    listFood,
    removeFood,
} from "../controllers/foodController.js";
import authMiddleWare from "../middlewares/auth.js";

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", authMiddleWare, upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.delete("/remove/:id", removeFood);

export default foodRouter;