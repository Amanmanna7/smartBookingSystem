const checkAlreadyBooked = (hostel, userId) => hostel.bookedRooms.find((bookedRoom) => bookedRoom.userId === userId);

module.exports = {checkAlreadyBooked}