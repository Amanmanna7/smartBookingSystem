const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hostelSchema = new Schema({
  hostelId: String,
  OwnerId: { type: Schema.ObjectId, ref: "User" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  totalRooms: {
    withWashroom: { type: Number, required: false, default: 0 },
    withoutWashroom: { type: Number, required: false, default: 0 },
  },
  genderAllowed: { type: String, required: false, default: "both" },
  facilities: {
    wifi: { type: Boolean, required: false, default: false },
    kitchen: { type: Boolean, required: false, default: false },
    ac: { type: Boolean, required: false, default: false },
    laundry: { type: Boolean, required: false, default: false },
    tv: { type: Boolean, required: false, default: false },
    parking: { type: Boolean, required: false, default: false },
    washing_machine: { type: Boolean, required: false, default: false },
    ironing_machine: { type: Boolean, required: false, default: false },
    gym: { type: Boolean, required: false, default: false },
  },
  city: { type: String, required: true },
  state: { type: String, required: true },
  location: {
    longitude: { type: Number, required: false, default: 0 },
    latitude: { type: Number, required: false, default: 0 },
  },
  price: { type: Number, required: false, default: 500 },
  rating: {
    type: Number,
    required: true,
    default: Math.floor(Math.random() * 5) + 1,
  },
  totalRoomsCount: { type: Number, required: false, default: 50 },
  bookedRooms: { type: Array, required: false, default: [] },
  bookedRoomsCount: { type: Number, required: false, default: 0 },
  image: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

// Create index on hostelId
hostelSchema.index({ hostelId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Hostel", hostelSchema);
