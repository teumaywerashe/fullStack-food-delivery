import { notificationModel } from "../models/notificationModel.js";

export const addNotification = async(req, res) => {
    try {
        const notification = await notificationModel.create(req.body);
        if (!notification) {
            return res
                .status(201)
                .json({ success: false, msg: "notification not created" });
        }
        res.status(201).json({ success: true, notification });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: " server error" });
    }
};

export const deleteNotification = async(req, res) => {
    const { id } = req.params;

    try {
        const deletedNotification = await notificationModel.findByIdAndDelete(id);
        if (!deletedNotification) {
            return res
                .status(404)
                .json({ success: false, msg: "notification not found" });
        }

        return res.status(200).json({ success: false, notification });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: true, msg: "server error" });
    }
};

export const getNotitfication = async(req, res) => {
    try {
        const { id } = req.params;
        const notification = await notificationModel.find({ to: id });
        if (!notification) {
            return res.status(500).json({ success: true, msg: "no notification" });
        }
        res.status(200).json({ success: true, notification });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "serer error" });
    }
};

export const updateNotification = async(req, res) => {
    const { id } = req.params;
    try {
        const notification = await notificationModel.findByIdAndUpdate(id, {
            isRead: true,
        });
        if (!notification) {
            return res
                .status(404)
                .json({ success: false, msg: "notification not found" });
        }
        res.status(201).json({ success: true, notification });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server error" });
    }
};


export const getAllNotification = async(req, res) => {
    try {
        const notification = await notificationModel.find()
        res.json({ success: true, notification })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "server Error" })

    }
}