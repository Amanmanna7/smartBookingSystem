const express = require("express");
const hostel = express.Router();
const hostelController = require("../controllers/hostelController");
const authController = require("../controllers/authController");

hostel.get("/", hostelController.getAllHostel);
hostel.get("/:id", hostelController.getHostelById);
hostel.post("/", authController.verifyToken, hostelController.addHostel);
hostel.post(
  "/booking",
  authController.verifyToken,
  hostelController.BookHostel
);
hostel.put(
  "/booking",
  authController.verifyToken,
  hostelController.acceptBooking
);
hostel.delete(
  "/booking",
  authController.verifyToken,
  hostelController.deleteBooking
);

hostel.get("/:hostel_id/:room_id", authController.verifyToken, hostelController.findRoomById);

hostel.get("/booking/:hostelId", hostelController.getAllPendingBookings);
hostel.post("/owner", hostelController.getHostelByOwnerId);

module.exports = hostel;
