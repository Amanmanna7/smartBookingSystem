const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  notificationId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: String,
  studentId: String,
  hostelId: String,
  status: {
    type: Number,
    default: 0,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

NotificationSchema.pre("save", function (next) {
  this.notificationId = this._id;
  next();
});

NotificationSchema.statics = {
  getAllNotifications: function (callback) {
    return this.find({}, callback);
  },
  getNotificationById: function (id, callback) {
    return this.findOne({ _id: id }, callback);
  },
  addNotification: function (notification, callback) {
    return this.create(notification, callback);
  },
  updateNotification: function (id, notification, options, callback) {
    return this.findOneAndUpdate({ _id: id }, notification, options, callback);
  },
  deleteNotification: function (id, callback) {
    return this.findOneAndRemove({ _id: id }, callback);
  },
};

module.exports = mongoose.model("Notification", NotificationSchema);
