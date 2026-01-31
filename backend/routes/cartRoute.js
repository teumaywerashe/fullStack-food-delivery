import { addToCart, getCart, removeFromCart } from "../controllers/cartControllers.js";
import authMiddleware from "../middlewares/auth.js";

export const handleCartRoutes = async(req, res) => {
    if (!req.url.startsWith("/cart")) return false;


    if (req.url === "/cart/add" && req.method === "POST") {
        if (!authMiddleware(req, res)) return;
        await addToCart(req, res);
        return true;
    }


    if (req.url === "/cart/get" && req.method === "GET") {
        if (!authMiddleware(req, res)) return;
        await getCart(req, res);
        return true;
    }


    if (req.url === "/cart/remove" && req.method === "DELETE") {
        if (!authMiddleware(req, res)) return;
        await removeFromCart(req, res);
        return true;
    }

    return false;
};