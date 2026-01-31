import { addFood, listFood, editFood, removeFood } from "../controllers/foodController.js";
import authMiddleware from "../middlewares/auth.js";

export const handleFoodRoutes = async(req, res) => {
    if (!req.url.startsWith("/food")) return false;


    if (req.url === "/food/add" && req.method === "POST") {
        if (!authMiddleware(req, res)) return true;


        await addFood(req, res);
        return true;
    }


    if (req.url === "/food/list" && req.method === "GET") {
        await listFood(req, res);
        return true;
    }


    if (req.url.startsWith("/food/remove/") && req.method === "DELETE") {
        await removeFood(req, res);
        return true;
    }

    if (req.url === "/food/edit" && req.method === "POST") {
        if (!authMiddleware(req, res)) return true;
        await editFood(req, res);
        return true;
    }

    return false;
};