import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  isRead: {
    type: Boolean,
    default: false,
  },
});

export const notificationModel =
  mongoose.models.notification ||
  mongoose.model("notification", notificationSchema);
