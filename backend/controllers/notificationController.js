const Notification = require("../models/Notification");
const Hostel = require("../models/Hostel");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const findUserById = (userId) => {
  return User.findOne({ userId }, (err, user) => {
    if (err) return err;
    return user.profile.name;
  });
};

const getAllNotifications = (req, res) => {
  const { userId } = req.params;

  const hostels = Hostel.find({ OwnerId: userId });
  hostels.projection({
    _id: 0,
    hostelId: 1,
    name: 1,
    bookedRooms: 1,
  });

  hostels.exec((err, HostelInfo) => {
    if (err) {
      res.status(500).send(err);
    }
    return res.send(HostelInfo);
  });
};

const getNotificationById = (req, res) => {
  const { id } = req.params;
  Notification.findOne({ _id: id }, (err, notification) => {
    if (err) return res.status(500).send(err);
    return res.send(notification);
  });
};

const addNotification = (req, res) => {
  const { hostelId, status, message, studentId } = req.body;
  const notification = new Notification({
    notificationId: uuidv4(),
    userId: req.user._id,
    hostelId,
    status,
    message,
    studentId,
  });
  notification.save((err, notificationInfo) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(notificationInfo);
  });
};

const updateNotification = (req, res) => {
  const { id } = req.params;
  const { hostelId, status, message, isRead } = req.body;
  Notification.findOneAndUpdate(
    { _id: id },
    {
      hostelId,
      status,
      message,
      isRead,
    },
    { new: true },
    (err, notification) => {
      if (err) return res.status(500).send(err);
      return res.send(notification);
    }
  );
};

const deleteNotification = (req, res) => {
  const { id } = req.params;
  Notification.findOneAndRemove({ _id: id }, (err, notification) => {
    if (err) return res.status(500).send(err);
    return res.send(notification);
  });
};

module.exports = {
  addNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
};
