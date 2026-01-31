import { placeOrder, verifyOrder, userOrders, updateStatus, listOrders } from "../controllers/orderController.js";
import authMiddleware from "../middlewares/auth.js";

export const handleOrderRoutes = async(req, res) => {
    if (!req.url.startsWith("/order")) return false;

    const url = req.url;
    const method = req.method;

    if (method === "POST" && url === "/order/place") {
        if (!authMiddleware(req, res)) return true;
        await placeOrder(req, res);
        return true;
    }

    if (method === "GET" && url.startsWith("/order/verify")) {
        if (!authMiddleware(req, res)) return true;

        await verifyOrder(req, res);
        return true;
    }

    if (method === "POST" && url.includes("/order/verify")) {
        await verifyOrder(req, res);
        return true;
    }

    if (method === "GET" && url === "/order/userOrder") {
        if (!authMiddleware(req, res)) return true;
        await userOrders(req, res);
        return true;
    }

    if (method === "POST" && url === "/order/status") {
        if (!authMiddleware(req, res)) return true;
        await updateStatus(req, res);
        return true;
    }


    if (method === "GET" && url === "/order/list") {
        if (!authMiddleware(req, res)) return true;
        await listOrders(req, res);
        return true;
    }

    return false;
};