import { notificationModel } from "../models/notificationModel.js";
import { sendJson } from "../utils/sendJson.js";


export const addNotification = async(req, res) => {
    try {

        const { to, content } = req.body;

        if (!to || !content) {
            return sendJson(res, 400, {
                success: false,
                msg: "Recipient ID (to) and content are required",
            });
        }

        const notification = await notificationModel.create({
            to,
            content,
            isRead: false
        });

        sendJson(res, 201, {
            success: true,
            notification,
        });
    } catch (error) {
        console.error("Add Notification Error:", error);
        sendJson(res, 500, {
            success: false,
            msg: "Internal server error",
        });
    }
};

export const getNotification = async(req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return sendJson(res, 400, { success: false, msg: "User ID required" });
        }


        const notifications = await notificationModel.find({ to: id }).sort({ createdAt: -1 });

        sendJson(res, 200, {
            success: true,
            notification: notifications || [],
        });
    } catch (error) {
        console.error(error);
        sendJson(res, 500, { success: false, msg: "Server error" });
    }
};

export const getAllNotification = async(req, res) => {
    try {
        const notifications = await notificationModel.find({}).sort({ createdAt: -1 });
        sendJson(res, 200, { success: true, notification: notifications });
    } catch (error) {
        sendJson(res, 500, { success: false, msg: "Error fetching notifications" });
    }
};

export const updateNotification = async(req, res) => {
    try {
        const id = req.params.id; // Corrected

        const notification = await notificationModel.findByIdAndUpdate(
            id, { isRead: true }, { new: true }
        );

        if (!notification) {
            return sendJson(res, 404, { success: false, msg: "Notification not found" });
        }

        sendJson(res, 200, { success: true, notification });
    } catch (error) {
        sendJson(res, 500, { success: false, msg: "Server error" });
    }
};

export const deleteNotification = async(req, res) => {
    try {
        const id = req.params.id; // Corrected

        const deleted = await notificationModel.findByIdAndDelete(id);

        if (!deleted) {
            return sendJson(res, 404, { success: false, msg: "Not found" });
        }

        sendJson(res, 200, { success: true, msg: "Deleted" });
    } catch (error) {
        sendJson(res, 500, { success: false, msg: "Server error" });
    }
};