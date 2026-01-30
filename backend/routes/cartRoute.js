import { addToCart, getCart, removeFromCart } from "../controllers/cartControllers.js";
import authMiddleware from "../middlewares/auth.js"; // pure Node.js auth

export const handleCartRoutes = async(req, res) => {
    // Make sure the route starts with /cart
    if (!req.url.startsWith("/cart")) return false;

    // POST /cart/add
    if (req.url === "/cart/add" && req.method === "POST") {
        if (!authMiddleware(req, res)) return;
        await addToCart(req, res);
        return true;
    }

    // GET /cart/get
    if (req.url === "/cart/get" && req.method === "GET") {
        if (!authMiddleware(req, res)) return;
        await getCart(req, res);
        return true;
    }

    // DELETE /cart/remove
    if (req.url === "/cart/remove" && req.method === "DELETE") {
        if (!authMiddleware(req, res)) return;
        await removeFromCart(req, res);
        return true;
    }

    return false; // route not handled
};