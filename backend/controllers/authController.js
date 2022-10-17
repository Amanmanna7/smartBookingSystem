const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { signToken } = require("../services/handlers");
const { v4: uuidv4 } = require("uuid");

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email, password }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    if (user) {
      res.send({
        token: signToken({ _id: user._id }),
        userInfo: user,
      });
    } else {
      res.status(401).send({ msg: "Invalid admin email or password" });
    }
  });
};

// register user
const register = (req, res) => {
  const { email, password, name, phone, gender, dob, collage, aadhar, role } =
    req.body;
  // const { originalname } = req.file;

  if (
    (!email || !password,
    !name || !phone || !gender || !dob || !collage || !aadhar || !role)
  ) {
    res.status(400).send({ msg: "Please enter all fields" });
  }

  //check if user already exist
  User.findOne({ email }, (err, userInfo) => {
    if (err) {
      res.status(500).send({ msg: "User Not Found" });
    }
    if (userInfo) {
      res.status(400).send({ msg: "User already exist" });
    }
  });

  const user = new User({
    userId: uuidv4(),
    email,
    password,
    profile: {
      name,
      phone,
      gender,
      dob,
      collage,
      aadhar,
      // image: originalname,
    },
    role,
  });

  user.save((err, userObj) => {
    if (err) {
      res.status(500).send({ msg: "Error while registration" });
    }
    const token = jwt.sign({ _id: userObj._id }, process.env.SECRET);
    res.status(200).send({ userObj, token });
  });
};

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided",
    });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    req.user = decoded;
    next();
  });
};

const getUser = (req, res) => {
  User.findOne({ userId: req.params.userId }, (err, user) => {
    if (err) {
      res.status(400).json({
        message: "Unable to get user from database",
      });
    }
    if (!user) {
      res.status(400).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      username: user.profile.name,
      collageId: user.profile.collage,
      aadhar: user.profile.aadhar,
    });
  });
};

const getAllUsernames = (req, res) => {
  User.find({}, { name: "$profile.name", userId: 1 }, (err, users) => {
    if (err) {
      res.status(400).json({
        message: "Unable to get users from database",
      });
    }
    if (!users) {
      res.status(400).json({
        message: "Users not found",
      });
    }
    res.status(200).json(users || []);
  });
};

const updateUser = (req, res) => {
  const { email, password, name, phone } = req.body;
  const { originalname } = req.file;

  if (!email || !password || !name || !phone) {
    res.status(400).send({ msg: "Please enter all fields" });
  }

  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      email,
      password,
      profile: {
        name,
        phone,
        image: originalname,
      },
    },
    { new: true },
    (err, user) => {
      if (err) return res.status(500).send(err);
      return res.send(user);
    }
  );
};

const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.user._id, (err, user) => {
    if (err) return res.status(500).send(err);
    return res.send(user);
  });
};

const getUserByOwnerId = (req, res) => {
  User.findOne({ ownerId: req.params.ownerId }, (err, user) => {
    if (err) {
      return res.status(400).json({
        message: "Unable to get user from database",
      });
    }
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    return res.status(200).json(user);
  });
};

module.exports = {
  login,
  register,
  verifyToken,
  getUser,
  getAllUsernames,
  getUserByOwnerId,
};
