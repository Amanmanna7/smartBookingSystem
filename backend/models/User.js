const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile: {
    name: String,
    gender: String,
    dob: Date,
    phone: String,
    image: { type: String, required: false },
    collage: { type: String, required: false },
    aadhar: { type: String, required: false },
    awaitingRequest: Object,
  },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ userId: 1, email: 1 }, { unique: 1 });

module.exports = mongoose.model("User", userSchema);
