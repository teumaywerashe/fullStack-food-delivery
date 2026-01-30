import {
    addNotification,
    deleteNotification,
    getAllNotification,
    getNotification,
    updateNotification
} from "../controllers/notificationController.js";

export const handleNotificationRoutes = async(req, res) => {
    if (!req.url.startsWith("/notification")) return false;

    const urlParts = req.url.split("/").filter(Boolean); // split path
    const method = req.method;

    // POST /notification
    if (method === "POST" && urlParts.length === 1) {
        await addNotification(req, res);
        return true;
    }

    // GET /notification (all)
    if (method === "GET" && urlParts.length === 1) {
        await getAllNotification(req, res);
        return true;
    }

    // GET /notification/:id
    if (method === "GET" && urlParts.length === 2) {
        req.params = { id: urlParts[1] };
        await getNotification(req, res);
        return true;
    }

    // DELETE /notification/:id
    if (method === "DELETE" && urlParts.length === 2) {
        req.params = { id: urlParts[1] };
        await deleteNotification(req, res);
        return true;
    }

    // PATCH /notification/:id
    if (method === "PATCH" && urlParts.length === 2) {
        req.params = { id: urlParts[1] };
        await updateNotification(req, res);
        return true;
    }

    return false;
};