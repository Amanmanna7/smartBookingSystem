const Hostel = require("../models/Hostel");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const { checkAlreadyBooked } = require("../services/validators");

const getAllHostel = (req, res) => {
  Hostel.find({}, (err, hostels) => {
    if (err) return res.status(500).send(err);
    return res.send(hostels);
  });
};
const getHostelById = (req, res) => {
  const { id } = req.params;
  Hostel.findOne({ _id: id }, (err, hostel) => {
    if (err) return res.status(500).send(err);
    return res.send(hostel);
  });
};

const addHostel = (req, res) => {
  const OwnerId = req.user._id;
  const {
    name,
    description,
    address,
    totalRooms,
    genderAllowed,
    facilities,
    city,
    state,
    rating,
    totalRoomsCount,
    price,
    image,
    location,
  } = req.body;
  const hostel = new Hostel({
    hostelId: uuidv4(),
    OwnerId,
    name,
    description,
    address,
    totalRooms,
    genderAllowed,
    facilities,
    city,
    state,
    rating,
    totalRoomsCount,
    price,
    image,
    location,
  });
  hostel.save((err, hostelInfo) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(hostelInfo);
  });
};

const updateHostel = (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    address,
    totalRooms,
    genderAllowed,
    facilities,
    city,
    state,
    price,
    image,
  } = req.body;
  Hostel.findOneAndUpdate(
    { _id: id },
    {
      name,
      description,
      address,
      totalRooms,
      genderAllowed,
      facilities,
      city,
      state,
      price,
      image,
    },
    { new: true },
    (err, hostel) => {
      if (err) return res.status(500).send(err);
      return res.send(hostel);
    }
  );
};

const getHostelByOwnerId = (req, res) => {
  const { OwnerId } = req.body;
  Hostel.find(
    { OwnerId: OwnerId },
    {
      _id: 0,
      hostelId: 1,
      name: 1,
      bookedRooms: 1,
    },
    (err, hostels) => {
      if (err) return res.status(500).send(err);
      if (hostels.length) {
        return res.send(hostels);
      }
      return res.send({ message: "No Hostels Found" });
    }
  );
};

const BookHostel = (req, res) => {
  const { hostelId, userId, OwnerId } = req.body;

  User.findOne({ _id: OwnerId }, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    Hostel.findOne({ hostelId: hostelId }, (err, hostel) => {
      // Error Checks
      if (err) return res.status(500).send(err);
      if (!hostel) {
        return res.status(400).json({
          message: "Hostel not found",
        });
      }
      if (hostel.totalRoomsCount === 0) {
        return res.status(400).json({
          message: "No rooms available",
        });
      }
      if (hostel.totalRoomsCount === hostel.bookedRoomsCount) {
        return res.status(400).json({
          message: "No rooms available",
        });
      }
      // Check if already booked
      if (checkAlreadyBooked(hostel, userId)) {
        return res.status(400).json({
          message: "Already booked",
        });
      }

      // If No Errors Hit then Proceed to adding Booking Request
      hostel.bookedRooms.push({ userId, status: "Pending" });
      hostel.totalRoomsCount -= 1;

      hostel.save((err, hostelInfo) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.send({
          bookedRoomsCount: hostelInfo.bookedRooms.length,
          totalRoomsCount: hostelInfo.totalRoomsCount,
        });
      });
    });
  });
};

const acceptBooking = (req, res) => {
  const { hostelId, userId, roomNumber } = req.body;
  Hostel.findOne({ hostelId: hostelId }, (err, hostel) => {
    if (err) return res.status(500).send(err);
    if (!hostel) {
      return res.status(400).json({
        message: "Hostel not found",
      });
    }
    const booked = hostel.bookedRooms.find(
      (bookedRoom) => bookedRoom.userId === userId
    );
    if (!booked) {
      return res.status(400).json({
        message: "Booking not found",
      });
    }
    booked.status = "Accepted";
    booked.roomNumber = roomNumber;
    hostel.bookedRooms = hostel.bookedRooms.filter(
      (bookedRoom) => bookedRoom.userId !== userId
    );
    hostel.bookedRooms.push(booked);
    hostel.bookedRoomsCount = hostel.bookedRooms.length;
    // hostel.totalRoomsCount = hostel.totalRoomsCount - 1;
    hostel.save((err, hostelInfo) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(hostelInfo);
    });
  });
};

const deleteBooking = (req, res) => {
  const { hostelId, userId } = req.body;
  Hostel.findOne({ hostelId: hostelId }, (err, hostel) => {
    if (err) return res.status(500).send(err);
    if (!hostel) {
      return res.status(400).json({
        message: "Hostel not found",
      });
    }
    const booked = hostel.bookedRooms.find(
      (bookedRoom) => bookedRoom.userId === userId
    );
    if (!booked) {
      return res.status(400).json({
        message: "Booking not found",
      });
    }
    booked.status = "Rejected";
    hostel.bookedRooms = hostel.bookedRooms.filter(
      (bookedRoom) =>
        bookedRoom.userId !== userId && bookedRoom.status !== "Rejected"
    );
    hostel.bookedRoomsCount = hostel.bookedRooms.length;
    hostel.totalRoomsCount = hostel.totalRoomsCount + 1;
    hostel.save((err, hostelInfo) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send({ bookedRooms: hostelInfo.bookedRooms });
    });
  });
};

const getAllPendingBookings = (req, res) => {
  const { hostelId } = req.params;
  Hostel.findOne({ hostelId: hostelId }, (err, hostels) => {
    if (err) return res.status(500).send(err);
    if (!hostels) {
      return res.status(400).json({
        message: "Hostel not found",
      });
    }
    const pendingBookings = hostels.bookedRooms.filter(
      (bookedRoom) => bookedRoom.status === "Pending"
    );

    return res.send(pendingBookings);
  });
};

const findRoomById = (req, res) => {
  const { hostel_id, room_id } = req.params;
  Hostel.findOne({ _id: hostel_id }, (err, hostel) => {
    if (err) return res.status(500).send(err);
    if (!hostel) {
      return res.status(400).json({
        message: "Hostel not found",
      });
    }
    const booked = hostel.bookedRooms.find(
      (bookedRoom) => bookedRoom.roomNumber === room_id
    );
    if (!booked) {
      return res.status(200).json({
        message: "Room not found",
      });
    }
    return res.send(booked);
  });
};

module.exports = {
  getAllHostel,
  addHostel,
  getHostelById,
  getHostelByOwnerId,
  updateHostel,
  BookHostel,
  acceptBooking,
  deleteBooking,
  findRoomById,
  getAllPendingBookings,
};
