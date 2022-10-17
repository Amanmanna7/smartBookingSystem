const express = require("express");
const auth = express.Router();
const authController = require("../controllers/authController");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

auth.post("/login", authController.login);
auth.post("/register", upload.single("profilePic"), authController.register);
auth.post("/", authController.verifyToken, authController.getUser);
auth.get(
  "/allUsernames",
  authController.verifyToken,
  authController.getAllUsernames
);
auth.get("/check", authController.verifyToken, (req, res) => {
  res.send(req.user);
});

auth.get(
  "/:ownerId",
  authController.verifyToken,
  authController.getUserByOwnerId
);

auth.get("/user/:userId", authController.verifyToken, authController.getUser);

module.exports = auth;
