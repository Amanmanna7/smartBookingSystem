const express = require("express");
const notification = express.Router();
const authController = require("../controllers/authController");
const notificationController = require("../controllers/notificationController");

notification.post(
  "/",
  authController.verifyToken,
  notificationController.addNotification
);
notification.get(
  "/me/:userId",
  authController.verifyToken,
  notificationController.getAllNotifications
);
notification.get(
  "/:id",
  authController.verifyToken,
  notificationController.getNotificationById
);
notification.put(
  "/:id",
  authController.verifyToken,
  notificationController.updateNotification
);
notification.delete(
  "/:id",
  authController.verifyToken,
  notificationController.deleteNotification
);

module.exports = notification;
